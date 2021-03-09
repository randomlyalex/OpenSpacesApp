package com.codeclan.openspaces.controllers;

import com.codeclan.openspaces.models.*;
import com.codeclan.openspaces.repositories.*;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
public class PoiController {

    @Autowired
    PoiRepository poiRepository;

    @Autowired
    BenchRepository benchRepository;

    @Autowired
    TableRepository tableRepository;

    @Autowired
    ToiletRepository toiletRepository;

    @Autowired
    SpaceRepository spaceRepository;

    @GetMapping(value = "/pois")
    public ResponseEntity<List<Poi>> getAllPois(
            @RequestParam(name = "type", required = false) String type
    ){
        if (type != null ){ return new ResponseEntity<>(poiRepository.findAllByType(type), HttpStatus.OK);}

        return new ResponseEntity<>(poiRepository.findAll(), HttpStatus.OK);
    }

       @PostMapping(value = "/benches")
    public ResponseEntity<Poi> postBench(@RequestBody Bench bench){
        benchRepository.save(bench);
        return new ResponseEntity<>(bench, HttpStatus.CREATED);
    }


    @PostMapping(value = "/tables")
    public ResponseEntity<Poi> postTable(@RequestBody Table table){
        tableRepository.save(table);
        return new ResponseEntity<>(table, HttpStatus.CREATED);
    }

    @PostMapping(value = "/toilets")
    public ResponseEntity<Poi> postToilet(@RequestBody Toilet toilet){
        toiletRepository.save(toilet);
        return new ResponseEntity<>(toilet, HttpStatus.CREATED);
    }

    @PostMapping(value = "/spaces")
    public ResponseEntity<Poi> postSpace(@RequestBody Space space){
        spaceRepository.save(space);
        return new ResponseEntity<>(space, HttpStatus.CREATED);
    }

}
