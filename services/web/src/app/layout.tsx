export const metadata = {
title: 'E‑Commerce Demo',
description: 'Microservices + Gateway + Next.js UI',
};


import './globals.css';


export default function RootLayout({ children }: { children: React.ReactNode }) {
return (
<html lang="vi">
<body>{children}</body>
</html>
);
}
