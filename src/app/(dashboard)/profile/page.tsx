'use client';

import { getUserInfo } from '@/services/auth.service';

export default function profilePage() {
  const { role } = getUserInfo() as any;
  return (
    <div>
      <h3 className="text-center font-sans text-2xl text-blue-800">
        Welcome to {`${role}`} Dashboard!
      </h3>
    </div>
  );
}
