package com.fedex.leave_management.Entity;

import jakarta.persistence.*;
import java.time.LocalDate;
import java.time.temporal.ChronoUnit;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;

@Entity
@JsonIgnoreProperties({"hibernateLazyInitializer", "handler"})
public class LeaveRequest {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    private String firstName;
    private String lastName;
    private String leaveType;
    private LocalDate fromDate;
    private LocalDate toDate;
    private int totalDays;
    private String additionalInfo;
    private String status; // e.g., PENDING, APPROVED, REJECTED

    private LocalDate appliedOn; // Date when the leave was applied
    private LocalDate approvedOn; // Date when the leave was approved/rejected
    private String approverName; // Name of the admin who approved/rejected the leave

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "employee_id", referencedColumnName = "employee_id")
    private Employee employee;

    // Default constructor
    public LeaveRequest() {
    }

    @PrePersist
    @PreUpdate
    public void calculateTotalDays() {
        if (fromDate != null && toDate != null) {
            this.totalDays = (int) ChronoUnit.DAYS.between(fromDate, toDate) + 1; // +1 to include endDate
        }
    }

    // Parameterized constructor
    public LeaveRequest(String leaveType, LocalDate fromDate, LocalDate toDate, int totalDays,
                        String additionalInfo, String status, LocalDate appliedOn, LocalDate approvedOn,
                        String approverName, Employee employee, String firstName, String lastName) {
        this.leaveType = leaveType;
        this.fromDate = fromDate;
        this.toDate = toDate;
        this.totalDays = totalDays;
        this.additionalInfo = additionalInfo;
        this.status = status;
        this.appliedOn = appliedOn;
        this.approvedOn = approvedOn;
        this.approverName = approverName;
        this.employee = employee;
        this.firstName = firstName;
        this.lastName = lastName;
    }

    // Getters and Setters

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getFirstName() {
        return firstName;
    }

    public void setFirstName(String firstName) {
        this.firstName = firstName;
    }

    public String getLastName() {
        return lastName;
    }

    public void setLastName(String lastName) {
        this.lastName = lastName;
    }

    public String getLeaveType() {
        return leaveType;
    }

    public void setLeaveType(String leaveType) {
        this.leaveType = leaveType;
    }

    public LocalDate getFromDate() {
        return fromDate;
    }

    public void setFromDate(LocalDate fromDate) {
        this.fromDate = fromDate;
    }

    public LocalDate getToDate() {
        return toDate;
    }

    public void setToDate(LocalDate toDate) {
        this.toDate = toDate;
    }

    public int getTotalDays() {
        return totalDays;
    }

    public void setTotalDays(int totalDays) {
        this.totalDays = totalDays;
    }

    public String getAdditionalInfo() {
        return additionalInfo;
    }

    public void setAdditionalInfo(String additionalInfo) {
        this.additionalInfo = additionalInfo;
    }

    public String getStatus() {
        return status;
    }

    public void setStatus(String status) {
        this.status = status;
    }

    public LocalDate getAppliedOn() {
        return appliedOn;
    }

    public void setAppliedOn(LocalDate appliedOn) {
        this.appliedOn = appliedOn;
    }

    public LocalDate getApprovedOn() {
        return approvedOn;
    }

    public void setApprovedOn(LocalDate approvedOn) {
        this.approvedOn = approvedOn;
    }

    public String getApproverName() {
        return approverName;
    }

    public void setApproverName(String approverName) {
        this.approverName = approverName;
    }

    public Employee getEmployee() {
        return employee;
    }

    public void setEmployee(Employee employee) {
        this.employee = employee;
    }
}
