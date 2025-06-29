import '../styles/global.scss';

export const metadata = {
  title: 'SkillUp Task Manager',
  description: 'Manage tasks by category',
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className="container py-4">
        {children}
      </body>
    </html>
  );
}
