package br.com.wallace.portfolio.services;

import org.springframework.stereotype.Service;

import br.com.wallace.portfolio.dtos.PersonalInfoResponseDTO;
import br.com.wallace.portfolio.dtos.requests.PersonalInfoRequestDTO;
import br.com.wallace.portfolio.exceptions.ProfileNotFoundException;
import br.com.wallace.portfolio.mappers.ProfileMapper;
import br.com.wallace.portfolio.model.entities.PersonalInfo;
import br.com.wallace.portfolio.model.repository.PersonalInfoRepository;
import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class PersonalInfoService {

    private final PersonalInfoRepository personalInfoRepository;

    public PersonalInfoResponseDTO getPersonalInfo() {
        PersonalInfo info = personalInfoRepository.findById(1)
                .orElseThrow(() -> new ProfileNotFoundException("Informações pessoais não encontradas"));

        return ProfileMapper.toResponse(info);
    }

    public PersonalInfoResponseDTO updatePersonalInfo(PersonalInfoRequestDTO request) {
        PersonalInfo existingInfo = personalInfoRepository.findById(1)
                .orElseThrow(() -> new ProfileNotFoundException("Informações pessoais não encontradas"));

        ProfileMapper.updateEntityFromRequest(request, existingInfo);

        PersonalInfo saved = personalInfoRepository.save(existingInfo);
        return ProfileMapper.toResponse(saved);
    }
}
