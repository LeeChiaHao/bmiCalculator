package com.example.bmi.app;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class PersonService {

    public final PersonRepository personRepository;

    @Autowired
    public PersonService(PersonRepository personRepository) {
        this.personRepository = personRepository;
    }

    public void createPerson(Person newPerson) {
        personRepository.save(newPerson);
    }

    public List<Person> readPerson() {
        return personRepository.findAll();
    }

    public void deletePerson(Long id) {
        boolean isExist = personRepository.existsById(id);
        if (!isExist) {
            throw new IllegalStateException("person ID: " + id + " does not exist, delete fail.");
        }
        personRepository.deleteById(id);
    }

    public void updatePerson(Long id, Person updatePerson) {
        Person curPerson = personRepository.findById(id).orElseThrow(
                () -> new IllegalStateException("person ID: " + id + " does not exist, edit fail"));
        curPerson.setName(updatePerson.getName());
        curPerson.setAge(updatePerson.getAge());
        curPerson.setWeight(updatePerson.getWeight());
        curPerson.setHeight(updatePerson.getHeight());

        personRepository.save(curPerson);
    }
}
