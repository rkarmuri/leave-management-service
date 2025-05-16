package com.fedex.leave_management.Service;

import com.fedex.leave_management.Entity.*;
import com.fedex.leave_management.Repository.*;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import com.fedex.leave_management.Dto.LeaveRequestDTO;
import java.time.LocalDate;
import java.time.temporal.ChronoUnit;
import java.util.List;

@Service
public class LeaveRequestService {

    @Autowired
    private LeaveRequestRepository leaveRequestRepository;

    @Autowired
    private EmployeeRepository employeeRepository;

    public LeaveRequest saveLeaveRequest(LeaveRequestDTO leaveRequestDTO) {
        // Fetch the Employee entity using the employeeId from DTO
        Employee employee = employeeRepository.findById(leaveRequestDTO.getEmployeeId())
                .orElseThrow(() -> new RuntimeException("Employee not found"));

        LocalDate startDate = leaveRequestDTO.getStartDate();
        LocalDate endDate = leaveRequestDTO.getEndDate();

        System.out.println("Start Date: " + startDate);
        System.out.println("End Date: " + endDate);
    
        if (startDate == null || endDate == null) {
            throw new IllegalArgumentException("Start date and end date must not be null");
        }
        // Convert DTO to Entity
        LeaveRequest leaveRequest = new LeaveRequest();
        leaveRequest.setLeaveType(leaveRequestDTO.getLeaveType());
        leaveRequest.setFromDate(leaveRequestDTO.getStartDate());
        leaveRequest.setToDate(leaveRequestDTO.getEndDate());
        leaveRequest.setEmployee(employee);
        leaveRequest.setAppliedOn(LocalDate.now());
        leaveRequest.setStatus("PENDING");

        // Calculate totalDays based on startDate and endDate
        long totalDays = ChronoUnit.DAYS.between(leaveRequestDTO.getStartDate(), leaveRequestDTO.getEndDate()) + 1; // inclusive of both dates
        leaveRequest.setTotalDays((int) totalDays);
        // Save the entity
        return leaveRequestRepository.save(leaveRequest);
    }

    public List<LeaveRequest> getLeaveRequestsByEmployeeId(Long employeeId) {
        return leaveRequestRepository.findByEmployeeId(employeeId);
    }

    public List<LeaveRequest> getLeaveRequestsByAdminId(Long adminId) {
        return leaveRequestRepository.findLeaveRequestsByAdminId(adminId);
    }    

    public List<LeaveRequest> getAllPendingLeaveRequests() {
        return leaveRequestRepository.findByStatus("PENDING");
    }

    public LeaveRequest approveLeaveRequest(Long requestId) {
        LeaveRequest leaveRequest = leaveRequestRepository.findById(requestId)
                .orElseThrow(() -> new RuntimeException("Leave Request not found"));
        leaveRequest.setStatus("APPROVED");
        return leaveRequestRepository.save(leaveRequest);
    }

    public LeaveRequest rejectLeaveRequest(Long requestId) {
        LeaveRequest leaveRequest = leaveRequestRepository.findById(requestId)
                .orElseThrow(() -> new RuntimeException("Leave Request not found"));
        leaveRequest.setStatus("DECLINED");
        leaveRequest.setApprovedOn(LocalDate.now());
        return leaveRequestRepository.save(leaveRequest);
    }

    public void deleteLeaveRequest(Long id) {
        leaveRequestRepository.deleteById(id);
    }

    public LeaveRequest updateLeaveRequest(Long id, LeaveRequestDTO leaveRequestDTO) {
        LeaveRequest existingLeaveRequest = leaveRequestRepository.findById(id)
            .orElseThrow(() -> new RuntimeException("Leave Request not found"));

    // Directly use LocalDate values from DTO
    LocalDate startDate = leaveRequestDTO.getStartDate();
    LocalDate endDate = leaveRequestDTO.getEndDate();

    System.out.println("Start Date: " + startDate);
    System.out.println("End Date: " + endDate);

    // Ensure dates are not null
    if (startDate == null || endDate == null) {
        throw new RuntimeException("Start Date or End Date is missing");
    }

    // Recalculate totalDays based on startDate and endDate
    long totalDays = ChronoUnit.DAYS.between(startDate, endDate) + 1;
    existingLeaveRequest.setTotalDays((int) totalDays);

    existingLeaveRequest.setFromDate(startDate);
    existingLeaveRequest.setToDate(endDate);
    existingLeaveRequest.setLeaveType(leaveRequestDTO.getLeaveType());
    existingLeaveRequest.setStatus(leaveRequestDTO.getStatus());

    return leaveRequestRepository.save(existingLeaveRequest);
}   
}

