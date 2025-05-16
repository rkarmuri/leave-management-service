package com.fedex.leave_management.Repository;

import com.fedex.leave_management.Entity.Admin;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;
import org.springframework.data.jpa.repository.Query;

@Repository
public interface AdminRepository extends JpaRepository<Admin, Long> {
    Admin findByUsername(String username);
    @Query("SELECT a.id FROM Admin a WHERE a.username = :username")
    Long findIdByUsername(@Param("username") String username);
}

