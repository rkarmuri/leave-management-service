package com.fedex.leave_management.Service;

import com.fedex.leave_management.Entity.Admin;
import com.fedex.leave_management.Repository.AdminRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class AdminService {

    @Autowired
    private AdminRepository adminRepository;

    public Admin findByUsername(String username) {
        return adminRepository.findByUsername(username);
    }

    public Long findIdByUsername(String username) {
        Admin admin = adminRepository.findByUsername(username);
        return admin != null ? admin.getId() : null;
    }

    public Admin saveAdmin(Admin admin) {
        return adminRepository.save(admin);
    }

    public Admin findById(Long id) {
        return adminRepository.findById(id).orElse(null);
    }

    public boolean authenticate(String username, String password) {
        Admin admin = adminRepository.findByUsername(username);
        return admin != null && admin.getPassword().equals(password); // Make sure to hash passwords in production
    }
}
