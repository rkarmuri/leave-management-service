package com.fedex.leave_management.Controller;

//import com.fedex.leave_management.Entity.Admin;
import com.fedex.leave_management.Entity.Employee;
import com.fedex.leave_management.Service.EmployeeService;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import com.fedex.leave_management.Dto.*;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpHeaders;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.http.MediaType;

import java.util.List;


@RestController
@RequestMapping("/api/employees")
public class EmployeeController {

    private static final Logger logger = LoggerFactory.getLogger(EmployeeController.class);

    @Autowired
    private EmployeeService employeeService;

    @GetMapping
    public ResponseEntity<List<Employee>> getAllEmployees() {
        List<Employee> employees = employeeService.findAll();
        return ResponseEntity.ok(employees);
    }

    @GetMapping("/{username}")
    public ResponseEntity<Employee> getEmployeeByUsername(@PathVariable String username) {
        Employee employee = employeeService.findByUsername(username);
        return ResponseEntity.ok(employee);
    }

    // In your EmployeeController
    @GetMapping("/employee-details/{username}")
    public ResponseEntity<EmployeeDetailsDTO> getEmployeeDetails(@PathVariable String username) {
        Employee employee = employeeService.findByUsername(username);
        if (employee != null) {
            EmployeeDetailsDTO detailsDTO = new EmployeeDetailsDTO();
            detailsDTO.setId(employee.getId());
            detailsDTO.setFullName(employee.getFirstName() + " " + employee.getLastName());
            return ResponseEntity.ok(detailsDTO);
        } else {
            return ResponseEntity.notFound().build();
        }
    }

    @GetMapping("/id/{username}")
    public ResponseEntity<Long> getEmployeeIdByUsername(@PathVariable String username) {
        logger.info("Received request for username: {}", username);
        Long employeeId = employeeService.findIdByUsername(username);
        if (employeeId != null) {
            return ResponseEntity.ok(employeeId);
        } else {
            return ResponseEntity.notFound().build();
        }
    }

    @GetMapping("/{id}")
    public ResponseEntity<Employee> getEmployeeById(@PathVariable Long id) {
        Employee employee = employeeService.findById(id);
        return ResponseEntity.ok(employee);
    }

    @GetMapping("/admin/{adminId}")
    public ResponseEntity<List<Employee>> getEmployeesByAdminId(@PathVariable Long adminId) {
        List<Employee> employees = employeeService.findByAdminId(adminId);
        logger.info("Fetched employees for admin ID {}: {}", adminId, employees);
        return ResponseEntity.ok()
                         .header(HttpHeaders.CONTENT_TYPE, MediaType.APPLICATION_JSON_VALUE)
                         .body(employees);
    }

    @PostMapping("/save")
    public ResponseEntity<Employee> saveEmployee(@RequestBody Employee employee) {
        Employee savedEmployee = employeeService.saveEmployee(employee);
        return ResponseEntity.ok(savedEmployee);
    }

    @DeleteMapping("/delete/{id}")
    public ResponseEntity<Void> deleteEmployee(@PathVariable Long id) {
        employeeService.deleteEmployee(id);
        return ResponseEntity.noContent().build();
    }

    @CrossOrigin(origins = "http://localhost:3000")
    @PostMapping("/login")
    public ResponseEntity<?> login(@RequestBody LoginRequest loginRequest) {
        System.out.println("Username: " + loginRequest.getUsername());
        System.out.println("Password: " + loginRequest.getPassword());

        boolean isAuthenticated = employeeService.authenticate(loginRequest.getUsername(), loginRequest.getPassword());
        if (isAuthenticated) {
            return ResponseEntity.ok(new SuccessResponse("Login successful")); // or return a token if using JWT
        } else {
            return ResponseEntity.status(401).body(new ErrorResponse("Invalid username or password"));
        }
    }
}
