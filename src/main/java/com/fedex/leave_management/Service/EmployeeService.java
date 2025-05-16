package com.fedex.leave_management.Service;

//import com.fedex.leave_management.Entity.Admin;
import com.fedex.leave_management.Entity.Employee;
import com.fedex.leave_management.Repository.EmployeeRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class EmployeeService {

    @Autowired
    private EmployeeRepository employeeRepository;

    public List<Employee> findAll() {
        return employeeRepository.findAll();
    }

    public List<Employee> findByAdminId(Long adminId) {
        return employeeRepository.findByAdminId(adminId);
    }

    public Employee findByUsername(String username) {
        return employeeRepository.findByUsername(username);
    }

    public Long findIdByUsername(String username) {
        Employee employee = employeeRepository.findByUsername(username);
        return employee != null ? employee.getId() : null;
    }

    public Employee saveEmployee(Employee employee) {
        return employeeRepository.save(employee);
    }

    public Employee findById(Long id) {
        return employeeRepository.findById(id).orElse(null);
    }

    public void deleteEmployee(Long id) {
        employeeRepository.deleteById(id);
    }

    public boolean authenticate(String username, String password) {
        Employee employee = employeeRepository.findByUsername(username);
        return employee != null && employee.getPassword().equals(password); // Make sure to hash passwords in production
    }
}
