package com.fedex.leave_management.Repository;

import com.fedex.leave_management.Entity.*;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.repository.query.Param;

import java.util.List;

public interface LeaveRequestRepository extends JpaRepository<LeaveRequest, Long> {
    List<LeaveRequest> findByEmployeeId(Long employeeId);
    List<LeaveRequest> findByStatus(String status);
    @Query("SELECT lr FROM LeaveRequest lr WHERE lr.employee.admin.id = :adminId")
    List<LeaveRequest> findLeaveRequestsByAdminId(@Param("adminId") Long adminId);
}

