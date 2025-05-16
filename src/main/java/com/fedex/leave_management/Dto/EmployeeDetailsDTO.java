package com.fedex.leave_management.Dto;

public class EmployeeDetailsDTO {
    private Long id;
    private String fullName;
    private String username;
    private String role;
    private String email;
    private String mobile;

    // Constructor
    public EmployeeDetailsDTO(Long id, String fullName, String username, String role, String email, String mobile) {
        this.id = id;
        this.fullName = fullName;
        this.username = username;
        this.role = role;
        this.email = email;
        this.mobile = mobile;
    }

    public EmployeeDetailsDTO() {
    }

    // Getters and Setters
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getFullName() {
        return fullName;
    }

    public void setFullName(String fullName) {
        this.fullName = fullName;
    }

    public String getUsername() {
        return username;
    }

    public void setUsername(String username) {
        this.username = username;
    }

    public String getRole() {
        return role;
    }

    public void setRole(String role) {
        this.role = role;
    }

    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public String getMobile() {
        return mobile;
    }

    public void setMobile(String mobile) {
        this.mobile = mobile;
    }
}
