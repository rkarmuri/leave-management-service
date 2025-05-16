package com.fedex.leave_management.Repository;

import com.fedex.leave_management.Entity.Employee;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface EmployeeRepository extends JpaRepository<Employee, Long> {
    List<Employee> findByAdminId(Long adminId);
    Employee findByUsername(String username);
}
