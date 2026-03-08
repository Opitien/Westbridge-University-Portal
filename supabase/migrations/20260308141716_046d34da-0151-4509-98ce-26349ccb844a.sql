
-- Departments table
CREATE TABLE public.departments (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  name text NOT NULL,
  code text NOT NULL UNIQUE,
  faculty text NOT NULL,
  head_of_department text,
  created_at timestamptz NOT NULL DEFAULT now()
);

-- Courses table
CREATE TABLE public.courses (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  code text NOT NULL UNIQUE,
  title text NOT NULL,
  credits integer NOT NULL DEFAULT 3,
  department_id uuid REFERENCES public.departments(id),
  lecturer_id uuid,
  semester text NOT NULL DEFAULT '2025/2026 First',
  level text DEFAULT '200',
  description text,
  created_at timestamptz NOT NULL DEFAULT now()
);

-- Enrollments
CREATE TABLE public.enrollments (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  student_id uuid NOT NULL,
  course_id uuid NOT NULL REFERENCES public.courses(id) ON DELETE CASCADE,
  semester text NOT NULL DEFAULT '2025/2026 First',
  status text NOT NULL DEFAULT 'registered',
  created_at timestamptz NOT NULL DEFAULT now(),
  UNIQUE(student_id, course_id, semester)
);

-- Results
CREATE TABLE public.results (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  student_id uuid NOT NULL,
  course_id uuid NOT NULL REFERENCES public.courses(id),
  semester text NOT NULL,
  grade text,
  points numeric(3,1),
  created_at timestamptz NOT NULL DEFAULT now(),
  UNIQUE(student_id, course_id, semester)
);

-- Fee structures
CREATE TABLE public.fee_structures (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  name text NOT NULL,
  amount numeric(12,2) NOT NULL,
  level text,
  semester text NOT NULL,
  faculty text,
  created_at timestamptz NOT NULL DEFAULT now()
);

-- Fee payments
CREATE TABLE public.fee_payments (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  student_id uuid NOT NULL,
  fee_structure_id uuid REFERENCES public.fee_structures(id),
  amount_paid numeric(12,2) NOT NULL DEFAULT 0,
  status text NOT NULL DEFAULT 'pending',
  payment_reference text,
  paid_at timestamptz,
  created_at timestamptz NOT NULL DEFAULT now()
);

-- Assignments
CREATE TABLE public.assignments (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  course_id uuid NOT NULL REFERENCES public.courses(id) ON DELETE CASCADE,
  title text NOT NULL,
  description text,
  due_date timestamptz NOT NULL,
  total_marks integer NOT NULL DEFAULT 100,
  created_by uuid NOT NULL,
  created_at timestamptz NOT NULL DEFAULT now()
);

-- Assignment submissions
CREATE TABLE public.assignment_submissions (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  assignment_id uuid NOT NULL REFERENCES public.assignments(id) ON DELETE CASCADE,
  student_id uuid NOT NULL,
  file_url text,
  content text,
  marks integer,
  graded_at timestamptz,
  submitted_at timestamptz NOT NULL DEFAULT now(),
  UNIQUE(assignment_id, student_id)
);

-- Attendance
CREATE TABLE public.attendance (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  course_id uuid NOT NULL REFERENCES public.courses(id) ON DELETE CASCADE,
  student_id uuid NOT NULL,
  date date NOT NULL,
  status text NOT NULL DEFAULT 'present',
  marked_by uuid,
  created_at timestamptz NOT NULL DEFAULT now(),
  UNIQUE(course_id, student_id, date)
);

-- Admissions
CREATE TABLE public.admissions (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  applicant_name text NOT NULL,
  email text NOT NULL,
  phone text,
  program text NOT NULL,
  faculty text,
  status text NOT NULL DEFAULT 'pending',
  jamb_score integer,
  application_date timestamptz NOT NULL DEFAULT now(),
  reviewed_by uuid,
  reviewed_at timestamptz,
  notes text,
  created_at timestamptz NOT NULL DEFAULT now()
);

-- Enable RLS on all tables
ALTER TABLE public.departments ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.courses ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.enrollments ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.results ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.fee_structures ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.fee_payments ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.assignments ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.assignment_submissions ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.attendance ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.admissions ENABLE ROW LEVEL SECURITY;

-- Departments: authenticated can read
CREATE POLICY "Authenticated can view departments" ON public.departments FOR SELECT TO authenticated USING (true);
CREATE POLICY "Admins manage departments" ON public.departments FOR ALL TO authenticated USING (public.has_role(auth.uid(), 'admin'));

-- Courses: authenticated can read
CREATE POLICY "Authenticated can view courses" ON public.courses FOR SELECT TO authenticated USING (true);
CREATE POLICY "Admins manage courses" ON public.courses FOR ALL TO authenticated USING (public.has_role(auth.uid(), 'admin'));
CREATE POLICY "Lecturers update own courses" ON public.courses FOR UPDATE TO authenticated USING (lecturer_id = auth.uid());

-- Enrollments
CREATE POLICY "Students view own enrollments" ON public.enrollments FOR SELECT TO authenticated USING (student_id = auth.uid());
CREATE POLICY "Students can enroll" ON public.enrollments FOR INSERT TO authenticated WITH CHECK (student_id = auth.uid());
CREATE POLICY "Students can drop" ON public.enrollments FOR DELETE TO authenticated USING (student_id = auth.uid());
CREATE POLICY "Admins manage enrollments" ON public.enrollments FOR ALL TO authenticated USING (public.has_role(auth.uid(), 'admin'));
CREATE POLICY "Lecturers view course enrollments" ON public.enrollments FOR SELECT TO authenticated USING (
  EXISTS (SELECT 1 FROM public.courses WHERE courses.id = enrollments.course_id AND courses.lecturer_id = auth.uid())
);

-- Results
CREATE POLICY "Students view own results" ON public.results FOR SELECT TO authenticated USING (student_id = auth.uid());
CREATE POLICY "Admins manage results" ON public.results FOR ALL TO authenticated USING (public.has_role(auth.uid(), 'admin'));
CREATE POLICY "Lecturers manage course results" ON public.results FOR ALL TO authenticated USING (
  EXISTS (SELECT 1 FROM public.courses WHERE courses.id = results.course_id AND courses.lecturer_id = auth.uid())
);

-- Fee structures: authenticated can read
CREATE POLICY "Authenticated view fee structures" ON public.fee_structures FOR SELECT TO authenticated USING (true);
CREATE POLICY "Admins manage fee structures" ON public.fee_structures FOR ALL TO authenticated USING (public.has_role(auth.uid(), 'admin'));

-- Fee payments
CREATE POLICY "Students view own payments" ON public.fee_payments FOR SELECT TO authenticated USING (student_id = auth.uid());
CREATE POLICY "Students make payments" ON public.fee_payments FOR INSERT TO authenticated WITH CHECK (student_id = auth.uid());
CREATE POLICY "Admins manage payments" ON public.fee_payments FOR ALL TO authenticated USING (public.has_role(auth.uid(), 'admin'));

-- Assignments
CREATE POLICY "View assignments for enrolled courses" ON public.assignments FOR SELECT TO authenticated USING (
  EXISTS (SELECT 1 FROM public.enrollments WHERE enrollments.course_id = assignments.course_id AND enrollments.student_id = auth.uid())
  OR public.has_role(auth.uid(), 'admin')
  OR created_by = auth.uid()
);
CREATE POLICY "Lecturers create assignments" ON public.assignments FOR INSERT TO authenticated WITH CHECK (created_by = auth.uid());
CREATE POLICY "Lecturers manage own assignments" ON public.assignments FOR UPDATE TO authenticated USING (created_by = auth.uid());
CREATE POLICY "Lecturers delete own assignments" ON public.assignments FOR DELETE TO authenticated USING (created_by = auth.uid());
CREATE POLICY "Admins manage assignments" ON public.assignments FOR ALL TO authenticated USING (public.has_role(auth.uid(), 'admin'));

-- Assignment submissions
CREATE POLICY "Students view own submissions" ON public.assignment_submissions FOR SELECT TO authenticated USING (student_id = auth.uid());
CREATE POLICY "Students submit" ON public.assignment_submissions FOR INSERT TO authenticated WITH CHECK (student_id = auth.uid());
CREATE POLICY "Lecturers view grade submissions" ON public.assignment_submissions FOR SELECT TO authenticated USING (
  EXISTS (SELECT 1 FROM public.assignments WHERE assignments.id = assignment_submissions.assignment_id AND assignments.created_by = auth.uid())
);
CREATE POLICY "Lecturers grade submissions" ON public.assignment_submissions FOR UPDATE TO authenticated USING (
  EXISTS (SELECT 1 FROM public.assignments WHERE assignments.id = assignment_submissions.assignment_id AND assignments.created_by = auth.uid())
);
CREATE POLICY "Admins manage submissions" ON public.assignment_submissions FOR ALL TO authenticated USING (public.has_role(auth.uid(), 'admin'));

-- Attendance
CREATE POLICY "Students view own attendance" ON public.attendance FOR SELECT TO authenticated USING (student_id = auth.uid());
CREATE POLICY "Lecturers manage attendance" ON public.attendance FOR ALL TO authenticated USING (marked_by = auth.uid());
CREATE POLICY "Admins manage attendance" ON public.attendance FOR ALL TO authenticated USING (public.has_role(auth.uid(), 'admin'));

-- Admissions
CREATE POLICY "Admins manage admissions" ON public.admissions FOR ALL TO authenticated USING (public.has_role(auth.uid(), 'admin'));

-- Seed departments
INSERT INTO public.departments (name, code, faculty) VALUES
('Computer Science', 'CSC', 'Science & Technology'),
('Mathematics', 'MTH', 'Science & Technology'),
('Physics', 'PHY', 'Science & Technology'),
('English', 'ENG', 'Arts & Humanities'),
('Business Administration', 'BUS', 'Management Sciences'),
('Accounting', 'ACC', 'Management Sciences');

-- Seed courses
INSERT INTO public.courses (code, title, credits, department_id, semester, level) VALUES
('CSC 301', 'Data Structures & Algorithms', 3, (SELECT id FROM public.departments WHERE code='CSC'), '2025/2026 First', '300'),
('CSC 305', 'Operating Systems', 3, (SELECT id FROM public.departments WHERE code='CSC'), '2025/2026 First', '300'),
('CSC 311', 'Software Engineering', 3, (SELECT id FROM public.departments WHERE code='CSC'), '2025/2026 First', '300'),
('CSC 321', 'Computer Networks', 3, (SELECT id FROM public.departments WHERE code='CSC'), '2025/2026 First', '300'),
('MTH 201', 'Linear Algebra', 3, (SELECT id FROM public.departments WHERE code='MTH'), '2025/2026 First', '200'),
('GST 201', 'Philosophy & Logic', 2, (SELECT id FROM public.departments WHERE code='ENG'), '2025/2026 First', '200'),
('ENG 201', 'Technical Writing', 2, (SELECT id FROM public.departments WHERE code='ENG'), '2025/2026 First', '200');

-- Seed fee structures
INSERT INTO public.fee_structures (name, amount, level, semester, faculty) VALUES
('Tuition Fee', 150000, NULL, '2025/2026 First', NULL),
('Laboratory Fee', 25000, NULL, '2025/2026 First', 'Science & Technology'),
('Library Fee', 10000, NULL, '2025/2026 First', NULL),
('ICT Fee', 15000, NULL, '2025/2026 First', NULL),
('Student Union Dues', 5000, NULL, '2025/2026 First', NULL);

-- Seed sample admissions
INSERT INTO public.admissions (applicant_name, email, phone, program, faculty, status, jamb_score) VALUES
('Adaeze Okafor', 'adaeze@example.com', '+2348012345678', 'Computer Science', 'Science & Technology', 'pending', 285),
('Emeka Nwankwo', 'emeka@example.com', '+2348023456789', 'Business Administration', 'Management Sciences', 'pending', 262),
('Fatima Abdullahi', 'fatima@example.com', '+2348034567890', 'Mathematics', 'Science & Technology', 'approved', 298),
('Oluwaseun Adeyemi', 'seun@example.com', '+2348045678901', 'English', 'Arts & Humanities', 'pending', 245),
('Chidinma Eze', 'chidinma@example.com', '+2348056789012', 'Accounting', 'Management Sciences', 'rejected', 180);

-- Enable realtime for key tables
ALTER PUBLICATION supabase_realtime ADD TABLE public.enrollments;
ALTER PUBLICATION supabase_realtime ADD TABLE public.assignments;
