import { BarChart, Folder, Grid2X2, Home, Settings, FolderKanban } from "lucide-react";
import Link from "next/link";
import React from "react";

export default function Sidebar() {
  return (
    <div className="hidden xl:flex xl:w-64 xl:flex-col border-r border-gray-300">
      <div className="flex flex-col pt-5 overflow-y-auto">
        <div className="flex flex-col justify-between flex-1 h-full px-4">
          <div className="space-y-4">
            <div>
              <p className="px-4 text-xs font-semibold tracking-widest text-gray-400 uppercase">
                Shedula
              </p>
              <nav className="flex-1 mt-4 space-y-1">
                <Link
                  href="/dashboard"
                  className="flex items-center px-4 py-2.5 text-sm font-medium transition-all duration-200 text-gray-900 rounded-lg hover:bg-gray-200 group"
                >
                  <Home className="flex-shrink-0 w-5 h-5 mr-4" />
                  Dashboard
                </Link>
                <Link
                  href="/dashboard/categories"
                  title="categories"
                  className="flex items-center px-4 py-2.5 text-sm font-medium transition-all duration-200 text-gray-900 rounded-lg hover:bg-gray-200 group"
                >
                  <Grid2X2 className="flex-shrink-0 w-5 h-5 mr-4" />
                  Appointments
                </Link>
                <Link
                  href="/dashboard/products"
                  className="flex items-center px-4 py-2.5 text-sm font-medium transition-all duration-200 text-gray-900 rounded-lg hover:bg-gray-200 group"
                >
                  <FolderKanban className="flex-shrink-0 w-5 h-5 mr-4" />
                  Patients
                </Link>
              </nav>
            </div>
          </div>

          <div className="pb-4 mt-12">
            <nav className="flex-1 space-y-1">
              <Link
                href="#"
                title=""
                className="flex items-center px-4 py-2.5 text-sm font-medium transition-all duration-200 text-gray-900 rounded-lg hover:bg-gray-200 group"
              >
                <Settings className="flex-shrink-0 w-5 h-5 mr-4" />
                Profile
              </Link>

              {/* <LogoutButton /> */}
            </nav>
          </div>
        </div>
      </div>
    </div>
  );
}