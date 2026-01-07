package br.com.wallace.portfolio.services;

import org.springframework.stereotype.Service;

import br.com.wallace.portfolio.dtos.ProfileResponseDTO;
import br.com.wallace.portfolio.exceptions.ProfileNotFoundException;
import br.com.wallace.portfolio.mappers.ProfileMapper;
import br.com.wallace.portfolio.model.entitites.Profile;
import br.com.wallace.portfolio.model.repository.ProfileRepository;
import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class ProfileService {

    private final ProfileRepository profileRepository;
    private final ProfileMapper mapper;

    public ProfileResponseDTO getProfile(){
        Profile profile = profileRepository.findById(1L).orElseThrow(
            () -> new ProfileNotFoundException("Profile not found")
        );
        return mapper.toResponse(profile);
    }






    
}
