# GOODWORK — Purpose & Project Goals

This document explains the purpose, intended audience, scope, and success criteria for the GOODWORK job board project. It is written to give contributors and stakeholders a shared understanding of why the project exists and what problems it aims to solve.

## Purpose Statement

GOODWORK is a lightweight job board that enables organizations and individual hiring managers to post job opportunities and allows candidates to discover and apply (or express interest in) roles. The application focuses on ease-of-use, quick posting, and clear job metadata to improve job discovery both for employers and job-seekers.

## Target Audience

- Small to medium businesses or solo founders who need a simple job-posting interface.
- Developers and technical candidates looking for contract or full-time opportunities.
- Teams learning full-stack development through a practical project.

## Goals

- Provide a minimal set of features to manage job lifecycle: create, read, update, delete.
- Offer secure user authentication for job managers.
- Keep the UI simple and responsive so maintainers can customize quickly.
- Provide clear API endpoints to integrate with other services (e.g., analytics, notifications).

    Protecting Jobseekers from Fraud
    
    Job fraud is unfortunately widespread, and protecting jobseekers is our top priority. Our verification link ensures that every job posting is authentic, helping you confidently apply to opportunities without falling victim to scams. By verifying jobs, we create a safer, trustworthy environment for your career growth. 


## Non-Goals

- This project is not intended to compete with major recruiting platforms (LinkedIn, Indeed).
- It does not include applicant tracking, resume parsing, or large-scale search ranking out of the box.

## Success Metrics

- Users can create and manage job posts without errors.
- New contributors can set up the project locally within 30 minutes using documentation.
- Tests (when added) cover core API behavior for auth and job CRUD.

## Roadmap / Future Enhancements

- Add applicant submission workflows (file uploads, application notes).
- Add search, filters, and pagination for job listings.
- Implement role-based access control for different user types.
- Add CI/CD pipeline and automated tests.

## How to Contribute

- Review [TECHNICAL.md](https://hackmd.io/@I5OyzHQDSGWGWqeLjg1tSg/S1dUmq2eZe) for developer guidance.
- Open an issue to discuss larger changes before implementing them.
- Submit PRs against `main` and include tests for new functionality.

---
*End of purpose document.*
