package com.example.bmi.app;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
// to let react access 8080, else blocked by CORS policy
@CrossOrigin
@RequestMapping(path = "api/v1/person")
public class PersonController {

    private final PersonService personService;

    @Autowired
    public PersonController(PersonService personService) {
        this.personService = personService;
    }

    @GetMapping
    public List<Person> readPerson() {
        return personService.readPerson();
    }

    @PostMapping
    // the newPerson parameter will come from request's body (json)
    public void createPerson(@RequestBody Person newPerson) {
        personService.createPerson(newPerson);
    }

    @DeleteMapping(path = "{personId}")
    // the id parameter will come prom the path variable - /{id}
    public void deletePerson(@PathVariable("personId") Long id) {
        personService.deletePerson(id);
    }

    @PutMapping(path = "{personId}")
    public void updatePerson(@PathVariable("personId") Long id, @RequestBody Person updatePerson) {
        personService.updatePerson(id, updatePerson);
    }

}
