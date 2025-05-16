package com.fedex.leave_management.Controller;

import com.fedex.leave_management.Entity.LeaveRequest;
import com.fedex.leave_management.Dto.*;
import com.fedex.leave_management.Service.*;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.stream.Collectors;

@RestController
@RequestMapping("/api/leave-requests")
public class LeaveRequestController {

    @Autowired
    private LeaveRequestService leaveRequestService;

    private static final Logger logger = LoggerFactory.getLogger(LeaveRequestController.class);

    @CrossOrigin(origins = "http://localhost:3000")
    @PostMapping("/apply")
    public ResponseEntity<LeaveRequest> applyLeave(@RequestBody LeaveRequestDTO leaveRequestDTO) {
        try {
            LeaveRequest savedLeaveRequest = leaveRequestService.saveLeaveRequest(leaveRequestDTO);
            return ResponseEntity.ok(savedLeaveRequest);
        } catch (Exception e) {
            e.printStackTrace(); // Log the error
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                    .body(null); // Return null or error message
        }
    }

    @GetMapping("/employee/{employeeId}")
    public ResponseEntity<List<LeaveRequestDTO>> getLeaveRequestsByEmployeeId(@PathVariable Long employeeId) {
        List<LeaveRequest> leaveRequests = leaveRequestService.getLeaveRequestsByEmployeeId(employeeId);
        List<LeaveRequestDTO> leaveRequestDTOs = leaveRequests.stream()
        	.map(this::convertToDTO)
        	.collect(Collectors.toList());
    	return ResponseEntity.ok(leaveRequestDTOs);
    }

    @GetMapping("/admin/{adminId}")
    public ResponseEntity<List<LeaveRequestDTO>> getLeaveRequestsByAdminId(@PathVariable Long adminId) {
        List<LeaveRequest> leaveRequests = leaveRequestService.getLeaveRequestsByAdminId(adminId);
        List<LeaveRequestDTO> leaveRequestDTOs = leaveRequests.stream()
            .map(this::convertToDTO)
            .collect(Collectors.toList());
        return ResponseEntity.ok(leaveRequestDTOs);
    }

    @PostMapping("/approve/{requestId}")
    public ResponseEntity<LeaveRequest> approveLeaveRequest(
            @PathVariable Long requestId) {
        LeaveRequest approvedRequest = leaveRequestService.approveLeaveRequest(requestId);
        return ResponseEntity.ok(approvedRequest);
    }

    @PostMapping("/reject/{requestId}")
    public ResponseEntity<LeaveRequest> rejectLeaveRequest(
            @PathVariable Long requestId) {
        LeaveRequest rejectedRequest = leaveRequestService.rejectLeaveRequest(requestId);
        return ResponseEntity.ok(rejectedRequest);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteLeaveRequest(@PathVariable Long id) {
        leaveRequestService.deleteLeaveRequest(id);
        return ResponseEntity.noContent().build(); // Return 204 No Content
    }

    @PutMapping("/{id}")
    public ResponseEntity<LeaveRequestDTO> updateLeaveRequest(
            @PathVariable Long id,
            @RequestBody LeaveRequestDTO leaveRequestDTO) {
        try {
            LeaveRequest updatedLeaveRequest = leaveRequestService.updateLeaveRequest(id, leaveRequestDTO);
            LeaveRequestDTO updatedLeaveRequestDTO = convertToDTO(updatedLeaveRequest);
            return ResponseEntity.ok(updatedLeaveRequestDTO);
        } catch (Exception e) {
            logger.error("Error updating leave request", e);
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).build();
        }
    }

    private LeaveRequestDTO convertToDTO(LeaveRequest leaveRequest) {
    	//System.out.println("Total Days in Entity: " + leaveRequest.getTotalDays());
        String employeeName = leaveRequest.getEmployee().getFirstName() + " " + leaveRequest.getEmployee().getLastName();
        return new LeaveRequestDTO(
        	leaveRequest.getId(),
        	leaveRequest.getLeaveType(),
        	leaveRequest.getFromDate(),
        	leaveRequest.getToDate(),
        	leaveRequest.getEmployee().getId(),
            leaveRequest.getTotalDays(),
            leaveRequest.getStatus(),
            employeeName
    	);
	}
}

