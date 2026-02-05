import React from 'react';
import { MapPin, DollarSign, Calendar, Clock, Briefcase, Building2, ExternalLink } from 'lucide-react';

const JobCard = ({ job }) => {
  // Calculate days remaining
  const daysRemaining = () => {
    const deadline = new Date(job.registrationDeadline);
    const today = new Date();
    const diffTime = deadline - today;
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    return diffDays;
  };

  const days = daysRemaining();
  const isExpired = days < 0;
  const isUrgent = days <= 3 && days >= 0;

  const formatVerificationLink = (link) => {
    if (!link) return '#';
    if (link.startsWith('http://') || link.startsWith('https://')) {
      return link;
    }
    return `https://${link}`;
  };

  const handleApplyClick = () => {
    const formattedLink = formatVerificationLink(job.verificationLink);
    window.open(formattedLink, '_blank', 'noopener,noreferrer');
  };

  return (
    <div className="bg-white dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 rounded-xl shadow-md hover:shadow-xl transition-all duration-300 overflow-hidden">
      
      {/* Header */}
      <div className="bg-neutral-100 dark:bg-neutral-800 px-6 py-4 border-b border-neutral-200 dark:border-neutral-700">
        <div className="flex justify-between items-start">
          <div className="flex items-center space-x-3">
            <div className="bg-white dark:bg-neutral-900 p-2 rounded-lg shadow-sm">
              <Building2 className="h-5 w-5 text-amber-200" />
            </div>

            <div>
              <h3 className="text-xl font-semibold text-neutral-900 dark:text-neutral-100">
                {job.title}
              </h3>
              <p className="text-sm text-neutral-600 dark:text-neutral-400 font-medium">
                {job.company}
              </p>
            </div>
          </div>

          <span className="px-3 py-1 bg-neutral-200 dark:bg-neutral-700 text-neutral-700 dark:text-neutral-200 text-xs font-semibold rounded-full uppercase">
            {job.type}
          </span>
        </div>
      </div>

      {/* Body */}
      <div className="p-6 space-y-4">

        <p className="text-neutral-600 dark:text-neutral-400 text-sm leading-relaxed line-clamp-3">
          {job.description}
        </p>

        {/* Details Grid */}
        <div className="grid grid-cols-2 gap-3 pt-2">

          <div className="flex items-center space-x-2 text-neutral-700 dark:text-neutral-300">
            <MapPin className="h-4 w-4 text-amber-300" />
            <span className="text-sm font-medium">{job.location}</span>
          </div>

          {job.salary && (
            <div className="flex items-center space-x-2 text-neutral-700 dark:text-neutral-300">
              <DollarSign className="h-4 w-4 text-amber-400" />
              <span className="text-sm font-bold text-amber-400">
                ₦{job.salary.toLocaleString()}
              </span>
            </div>
          )}

          <div className="flex items-center space-x-2 text-neutral-700 dark:text-neutral-300">
            <Briefcase className="h-4 w-4 text-amber-300" />
            <span className="text-xs text-neutral-600 dark:text-neutral-400">
              {job.employerId?.fullname || 'Company'}
            </span>
          </div>

          <div className="flex items-center space-x-2 text-neutral-700 dark:text-neutral-300">
            <Clock className="h-4 w-4 text-amber-300" />
            <span className="text-xs text-neutral-600 dark:text-neutral-400">
              {new Date(job.createdAt).toLocaleDateString()}
            </span>
          </div>
        </div>

        {/* Deadline Section */}
        <div className="pt-3 border-t border-neutral-200 dark:border-neutral-800">
          <div className="flex items-center justify-between">
            
            <div className="flex items-center space-x-2">
              <Calendar
                className={`h-4 w-4 ${
                  isExpired
                    ? 'text-red-500'
                    : isUrgent
                    ? 'text-orange-500'
                    : 'text-amber-300'
                }`}
              />
              <span className="text-xs text-neutral-600 dark:text-neutral-400 font-medium">
                Application Deadline:
              </span>
            </div>

            {isExpired ? (
              <span className="px-3 py-1 bg-red-600/20 text-red-500 text-xs font-bold rounded-full">
                CLOSED
              </span>
            ) : isUrgent ? (
              <span className="px-3 py-1 bg-orange-600/20 text-orange-400 text-xs font-bold rounded-full animate-pulse">
                {days} {days === 1 ? 'day' : 'days'} left
              </span>
            ) : (
              <span className="px-3 py-1 bg-neutral-200 dark:bg-neutral-700 text-neutral-700 dark:text-neutral-200 text-xs font-bold rounded-full">
                {days} {days === 1 ? 'day' : 'days'} left
              </span>
            )}

          </div>

          <p className="text-xs text-neutral-600 dark:text-neutral-500 mt-1">
            {new Date(job.registrationDeadline).toLocaleDateString('en-US', {
              weekday: 'long',
              year: 'numeric',
              month: 'long',
              day: 'numeric'
            })}
          </p>
        </div>
      </div>

      {/* Apply Button */}
      {!isExpired && (
        <div className="px-6 pb-6">
          <button
            onClick={handleApplyClick}
            className="w-full bg-amber-500 text-neutral-900 py-3 rounded-lg font-semibold hover:bg-amber-600 transition-all duration-300 transform hover:scale-105 shadow-md flex items-center justify-center space-x-2"
          >
            <span>Apply Now</span>
            <ExternalLink className="h-4 w-4" />
          </button>
        </div>
      )}
    </div>
  );
};

export default JobCard;
