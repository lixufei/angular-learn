package com.thoughtworks.transformer;

import com.thoughtworks.dto.PetDTO;
import com.thoughtworks.model.Gender;
import com.thoughtworks.model.Pet;

public class PetTransformer {
    public static Pet transform(PetDTO pet) {
        return new Pet(pet.name, Gender.valueOf(pet.gender.toUpperCase()), pet.type);
    }
}
