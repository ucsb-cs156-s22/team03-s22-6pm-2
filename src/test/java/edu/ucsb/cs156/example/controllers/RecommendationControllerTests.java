package edu.ucsb.cs156.example.controllers;

import edu.ucsb.cs156.example.repositories.UserRepository;
import edu.ucsb.cs156.example.testconfig.TestConfig;
import edu.ucsb.cs156.example.ControllerTestCase;
import edu.ucsb.cs156.example.entities.Recommendation;
import edu.ucsb.cs156.example.repositories.RecommendationRepository;

import java.util.ArrayList;
import java.util.Arrays;
import java.util.Map;
import org.junit.jupiter.api.Test;
import org.springframework.boot.test.autoconfigure.web.servlet.WebMvcTest;
import org.springframework.boot.test.mock.mockito.MockBean;
import org.springframework.context.annotation.Import;
import org.springframework.http.MediaType;
import org.springframework.security.test.context.support.WithMockUser;
import org.springframework.test.web.servlet.MvcResult;

import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.*;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;
import static org.springframework.security.test.web.servlet.request.SecurityMockMvcRequestPostProcessors.csrf;

import java.time.LocalDateTime;
import java.util.Optional;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.mockito.ArgumentMatchers.any;
import static org.mockito.ArgumentMatchers.eq;
import static org.mockito.Mockito.times;
import static org.mockito.Mockito.verify;
import static org.mockito.Mockito.when;

@WebMvcTest(controllers = RecommendationController.class)
@Import(TestConfig.class)
public class RecommendationControllerTests extends ControllerTestCase {

        @MockBean
        RecommendationRepository recommendationRepository;

        @MockBean
        UserRepository userRepository;

        // Authorization tests for /api/ucsbdiningcommons/admin/all

        @Test
        public void logged_out_users_cannot_get_all() throws Exception {
                mockMvc.perform(get("/api/Recommendation/all"))
                                .andExpect(status().is(403)); // logged out users can't get all
        }

        @WithMockUser(roles = { "USER" })
        @Test
        public void logged_in_users_can_get_all() throws Exception {
                mockMvc.perform(get("/api/Recommendation/all"))
                                .andExpect(status().is(200)); // logged
        }

        @Test
        public void logged_out_users_cannot_get_by_id() throws Exception {
                mockMvc.perform(get("/api/Recommendation?id=1"))
                                .andExpect(status().is(403)); // logged out users can't get by id
        }

        // Authorization tests for /api/ucsbdiningcommons/post
        // (Perhaps should also have these for put and delete)

        @Test
        public void logged_out_users_cannot_post() throws Exception {
                mockMvc.perform(post("/api/Recommendation/post"))
                                .andExpect(status().is(403));
        }

        @WithMockUser(roles = { "USER" })
        @Test
        public void logged_in_regular_users_cannot_post() throws Exception {
                mockMvc.perform(post("/api/Recommendation/post"))
                                .andExpect(status().is(403)); // only admins can post
        }

        // Tests with mocks for database actions

        @WithMockUser(roles = { "USER" })
        @Test
        public void test_that_logged_in_user_can_get_by_id_when_the_id_exists() throws Exception {

                // arrange

                Recommendation recommendation = Recommendation.builder()
                                .requesterEmail("requester")
                                .professorEmail("professor")
                                .explanation("explain")
                                .dateRequested(LocalDateTime.parse("2022-01-01T00:00:00"))
                                .dateNeeded(LocalDateTime.parse("2022-01-01T00:00:00"))
                                .done(true)
                                .build();

                when(recommendationRepository.findById(eq(1L))).thenReturn(Optional.of(recommendation));

                // act
                MvcResult response = mockMvc.perform(get("/api/Recommendation?id=1"))
                                .andExpect(status().isOk()).andReturn();

                // assert

                verify(recommendationRepository, times(1)).findById(eq(1L));
                String expectedJson = mapper.writeValueAsString(recommendation);
                String responseString = response.getResponse().getContentAsString();
                assertEquals(expectedJson, responseString);
        }

        @WithMockUser(roles = { "USER" })
        @Test
        public void test_that_logged_in_user_can_get_by_id_when_the_id_does_not_exist() throws Exception {

                // arrange

                when(recommendationRepository.findById(eq(2L))).thenReturn(Optional.empty());

                // act
                MvcResult response = mockMvc.perform(get("/api/Recommendation?id=2"))
                                .andExpect(status().isNotFound()).andReturn();

                // assert

                verify(recommendationRepository, times(1)).findById(eq(2L));
                Map<String, Object> json = responseToJson(response);
                assertEquals("EntityNotFoundException", json.get("type"));
                assertEquals("Recommendation with id 2 not found", json.get("message"));
        }

        @WithMockUser(roles = { "USER" })
        @Test
        public void logged_in_user_can_get_all_ucsbdiningcommons() throws Exception {

                // arrange

                Recommendation rec1 = Recommendation.builder()
                                .requesterEmail("requester1")
                                .professorEmail("professor1")
                                .explanation("explain")
                                .dateRequested(LocalDateTime.parse("2022-01-01T00:00:00"))
                                .dateNeeded(LocalDateTime.parse("2022-01-01T00:00:00"))
                                .done(true)
                                .build();

                Recommendation rec2 = Recommendation.builder()
                                .requesterEmail("requester2")
                                .professorEmail("professor2")
                                .explanation("explain")
                                .dateRequested(LocalDateTime.parse("2022-01-01T00:00:00"))
                                .dateNeeded(LocalDateTime.parse("2022-01-01T00:00:00"))
                                .done(true)
                                .build();

                ArrayList<Recommendation> expectedRecommendation = new ArrayList<>();
                expectedRecommendation.addAll(Arrays.asList(rec1, rec2));

                when(recommendationRepository.findAll()).thenReturn(expectedRecommendation);

                // act
                MvcResult response = mockMvc.perform(get("/api/Recommendation/all"))
                                .andExpect(status().isOk()).andReturn();

                // assert

                verify(recommendationRepository, times(1)).findAll();
                String expectedJson = mapper.writeValueAsString(expectedRecommendation);
                String responseString = response.getResponse().getContentAsString();
                assertEquals(expectedJson, responseString);
        }

        @WithMockUser(roles = { "ADMIN", "USER" })
        @Test
        public void an_admin_user_can_post_a_new_commons() throws Exception {
                // arrange

                Recommendation rec1 = Recommendation.builder()
                                .requesterEmail("requester1")
                                .professorEmail("professor1")
                                .explanation("explain")
                                .dateRequested(LocalDateTime.parse("2022-01-01T00:00:00"))
                                .dateNeeded(LocalDateTime.parse("2022-01-01T00:00:00"))
                                .done(true)
                                .build();

                when(recommendationRepository.save(eq(rec1))).thenReturn(rec1);

                // act
                MvcResult response = mockMvc.perform(
                                post("/api/Recommendation/post?requesterEmail=requester1&professorEmail=professor1&explanation=explain&dateRequested=2022-01-01T00:00:00&dateNeeded=2022-01-01T00:00:00&done=true")
                                                .with(csrf()))
                                .andExpect(status().isOk()).andReturn();

                // assert
                verify(recommendationRepository, times(1)).save(rec1);
                String expectedJson = mapper.writeValueAsString(rec1);
                String responseString = response.getResponse().getContentAsString();
                assertEquals(expectedJson, responseString);
        }

        @WithMockUser(roles = { "ADMIN", "USER" })
        @Test
        public void admin_can_delete_a_date() throws Exception {
                // arrange

                Recommendation rec1 = Recommendation.builder()
                                .requesterEmail("requester4")
                                .professorEmail("professor4")
                                .explanation("explain")
                                .dateRequested(LocalDateTime.parse("2022-01-01T00:00:00"))
                                .dateNeeded(LocalDateTime.parse("2022-01-01T00:00:00"))
                                .done(true)
                                .build();

                when(recommendationRepository.findById(eq(4L))).thenReturn(Optional.of(rec1));

                // act
                MvcResult response = mockMvc.perform(
                                delete("/api/Recommendation?id=4")
                                                .with(csrf()))
                                .andExpect(status().isOk()).andReturn();

                // assert
                verify(recommendationRepository, times(1)).findById(4L);
                verify(recommendationRepository, times(1)).delete(any());

                Map<String, Object> json = responseToJson(response);
                assertEquals("Recommendation with id 4 deleted", json.get("message"));
        }

        @WithMockUser(roles = { "ADMIN", "USER" })
        @Test
        public void admin_tries_to_delete_non_existant_commons_and_gets_right_error_message()
                        throws Exception {
                // arrange

                when(recommendationRepository.findById(eq(12L))).thenReturn(Optional.empty());

                // act
                MvcResult response = mockMvc.perform(
                                delete("/api/Recommendation?id=5")
                                                .with(csrf()))
                                .andExpect(status().isNotFound()).andReturn();

                // assert
                verify(recommendationRepository, times(1)).findById(5L);
                Map<String, Object> json = responseToJson(response);
                assertEquals("Recommendation with id 5 not found", json.get("message"));
        }

        @WithMockUser(roles = { "ADMIN", "USER" })
        @Test
        public void admin_can_edit_an_existing_commons() throws Exception {
                // arrange

                Recommendation rec1 = Recommendation.builder()
                                .requesterEmail("requester1")
                                .professorEmail("professor1")
                                .explanation("explain")
                                .dateRequested(LocalDateTime.parse("2022-01-01T00:00:00"))
                                .dateNeeded(LocalDateTime.parse("2022-01-01T00:00:00"))
                                .done(true)
                                .build();
                                

                Recommendation rec1Edited = Recommendation.builder()
                                .requesterEmail("requester12")
                                .professorEmail("professor12")
                                .explanation("explain2")
                                .dateRequested(LocalDateTime.parse("2022-01-01T00:00:01"))
                                .dateNeeded(LocalDateTime.parse("2022-01-01T00:00:01"))
                                .done(false)
                                .build();

                String requestBody = mapper.writeValueAsString(rec1Edited);

                when(recommendationRepository.findById(eq(1L))).thenReturn(Optional.of(rec1));

                // act
                MvcResult response = mockMvc.perform(
                                put("/api/Recommendation?id=1")
                                                .contentType(MediaType.APPLICATION_JSON)
                                                .characterEncoding("utf-8")
                                                .content(requestBody)
                                                .with(csrf()))
                                .andExpect(status().isOk()).andReturn();

                // assert
                verify(recommendationRepository, times(1)).findById(1L);
                verify(recommendationRepository, times(1)).save(rec1Edited); // should be saved with updated info
                String responseString = response.getResponse().getContentAsString();
                assertEquals(requestBody, responseString);
        }

        @WithMockUser(roles = { "ADMIN", "USER" })
        @Test
        public void admin_cannot_edit_commons_that_does_not_exist() throws Exception {
                // arrange

                Recommendation editedRecommendation = Recommendation.builder()
                                .requesterEmail("requester0")
                                .professorEmail("professor0")
                                .explanation("explain")
                                .dateRequested(LocalDateTime.parse("2022-01-01T00:00:00"))
                                .dateNeeded(LocalDateTime.parse("2022-01-01T00:00:00"))
                                .done(true)
                                .build();

                String requestBody = mapper.writeValueAsString(editedRecommendation);

                when(recommendationRepository.findById(eq(0L))).thenReturn(Optional.empty());

                // act
                MvcResult response = mockMvc.perform(
                                put("/api/Recommendation?id=0")
                                                .contentType(MediaType.APPLICATION_JSON)
                                                .characterEncoding("utf-8")
                                                .content(requestBody)
                                                .with(csrf()))
                                .andExpect(status().isNotFound()).andReturn();

                // assert
                verify(recommendationRepository, times(1)).findById(0L);
                Map<String, Object> json = responseToJson(response);
                assertEquals("Recommendation with id 0 not found", json.get("message"));

        }
}