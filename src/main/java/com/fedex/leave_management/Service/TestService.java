package com.fedex.leave_management.Service;

import com.fedex.leave_management.Entity.Employee;
import com.fedex.leave_management.Repository.EmployeeRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class TestService {

    @Autowired
    private EmployeeRepository employeeRepository;

    public List<Employee> getAllEmployees() {
        List<Employee> employees = employeeRepository.findAll();
        System.out.println("Employees retrieved: " + employees);
        return employees;
    }
}
