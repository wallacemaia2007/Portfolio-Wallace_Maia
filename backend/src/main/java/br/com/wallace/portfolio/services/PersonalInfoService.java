package br.com.wallace.portfolio.services;

import org.springframework.stereotype.Service;

import br.com.wallace.portfolio.dtos.PersonalInfoResponseDTO;
import br.com.wallace.portfolio.dtos.requests.PersonalInfoRequestDTO;
import br.com.wallace.portfolio.exceptions.PersonalInfoAlreadyExistsException;
import br.com.wallace.portfolio.exceptions.ProfileNotFoundException;
import br.com.wallace.portfolio.mappers.ProfileMapper;
import br.com.wallace.portfolio.model.entities.PersonalInfo;
import br.com.wallace.portfolio.model.repository.PersonalInfoRepository;
import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class PersonalInfoService {

    private static final Long ID = 1L;
    private final PersonalInfoRepository personalInfoRepository;

    private PersonalInfo getPersonalInfoEntity() {
        return personalInfoRepository.findById(ID)
                .orElseThrow(() -> new ProfileNotFoundException("Personal info not found with id: 1"));
    }

    @Transactional
    public PersonalInfoResponseDTO getPersonalInfo() {
        PersonalInfo info = getPersonalInfoEntity();

        return ProfileMapper.toResponse(info);
    }

    @Transactional
    public PersonalInfoResponseDTO updatePersonalInfo(PersonalInfoRequestDTO request) {
        PersonalInfo existingInfo = personalInfoRepository.findById(ID)
                .orElseThrow(() -> new ProfileNotFoundException("Informações pessoais não encontradas"));

        ProfileMapper.updateEntityFromRequest(request, existingInfo);

        PersonalInfo saved = personalInfoRepository.save(existingInfo);
        return ProfileMapper.toResponse(saved);
    }

    @Transactional
    public PersonalInfoResponseDTO createPersonalInfo(PersonalInfoRequestDTO request) {
        if (personalInfoRepository.existsById(ID)) {
            throw new PersonalInfoAlreadyExistsException("Personal info already exists. Only one instance is allowed.");
        }

        PersonalInfo personalInfo = ProfileMapper.toEntity(request);
        return ProfileMapper.toResponse(personalInfoRepository.save(personalInfo));
    }

    @Transactional
    public void deletePersonalInfo() {
        if (!personalInfoRepository.existsById(ID)) {
            throw new ProfileNotFoundException("Personal info not found");
        }
        personalInfoRepository.deleteById(ID);
    }
}
