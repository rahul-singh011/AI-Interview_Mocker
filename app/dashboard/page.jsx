import { UserButton } from "@clerk/nextjs";
import React from "react";
import AddNewInterview from "./_components/AddNewInterview";
import InterviewList from "./_components/InterviewList";
import { FaChartLine, FaCalendarAlt, FaClock } from "react-icons/fa";

const Dashboard = () => {
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header Section */}
      <div className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto p-6">
          <div className="flex justify-between items-center">
            <div>
              <h2 className="font-bold text-3xl text-gray-800">Welcome Folk!</h2>
              <p className="text-gray-600 mt-1">Prepare for your next interview</p>
            </div>
            
          </div>
        </div>
      </div>

      {/* Stats Section */}
      <div className="max-w-7xl mx-auto p-6">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <div className="bg-white p-6 rounded-xl shadow-sm hover:shadow-md transition">
            <div className="flex items-center gap-4">
              <div className="p-3 bg-blue-100 rounded-lg">
                <FaChartLine className="w-6 h-6 text-blue-600" />
              </div>
              <div>
                <p className="text-gray-600">Total Interviews</p>
                <h3 className="text-2xl font-bold text-gray-800">24</h3>
              </div>
            </div>
          </div>
          
          <div className="bg-white p-6 rounded-xl shadow-sm hover:shadow-md transition">
            <div className="flex items-center gap-4">
              <div className="p-3 bg-green-100 rounded-lg">
                <FaCalendarAlt className="w-6 h-6 text-green-600" />
              </div>
              <div>
                <p className="text-gray-600">This Week</p>
                <h3 className="text-2xl font-bold text-gray-800">5</h3>
              </div>
            </div>
          </div>

          <div className="bg-white p-6 rounded-xl shadow-sm hover:shadow-md transition">
            <div className="flex items-center gap-4">
              <div className="p-3 bg-purple-100 rounded-lg">
                <FaClock className="w-6 h-6 text-purple-600" />
              </div>
              <div>
                <p className="text-gray-600">Hours Practiced</p>
                <h3 className="text-2xl font-bold text-gray-800">12.5</h3>
              </div>
            </div>
          </div>
        </div>

        {/* New Interview Section */}
        <div className="bg-white rounded-xl shadow-sm p-6 mb-8">
          <h3 className="text-xl font-semibold text-gray-800 mb-6">Start New Interview</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <AddNewInterview />
          </div>
        </div>

        {/* Recent Interviews Section */}
        <div className="bg-white rounded-xl shadow-sm p-6">
          <div className="flex justify-between items-center mb-6">
            <h3 className="text-xl font-semibold text-gray-800">Recent Interviews</h3>
            <button className="text-blue-600 hover:text-blue-700 font-medium">
              View All
            </button>
          </div>
          <InterviewList />
        </div>
      </div>
    </div>
  );
};

export default Dashboard;