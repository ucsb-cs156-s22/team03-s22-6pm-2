package edu.ucsb.cs156.example.entities;
import javax.persistence.Entity;
import javax.persistence.Id;
import javax.persistence.GenerationType;
import javax.persistence.GeneratedValue;

import lombok.Data;
import lombok.NoArgsConstructor;
// import net.bytebuddy.dynamic.loading.ClassReloadingStrategy.Strategy;
import lombok.AllArgsConstructor;
import lombok.Builder;

@Data
@AllArgsConstructor
@NoArgsConstructor
@Builder
@Entity(name = "ucsbdiningcommonsmenuitem")
public class UCSBDiningCommonsMenuItem {
  @Id
  @GeneratedValue(strategy = GenerationType.IDENTITY)
  private long id;
  private String name;
  private String diningCommonsCode;
  private String station;
 
}