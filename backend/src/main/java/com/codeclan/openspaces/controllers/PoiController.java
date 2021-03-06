package com.codeclan.openspaces.controllers;

import com.codeclan.openspaces.models.Bench;
import com.codeclan.openspaces.models.Poi;
import com.codeclan.openspaces.models.Table;
import com.codeclan.openspaces.repositories.BenchRepository;
import com.codeclan.openspaces.repositories.PoiRepository;
import com.codeclan.openspaces.repositories.TableRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
public class PoiController {

    @Autowired
    PoiRepository poiRepository;

    @Autowired
    BenchRepository benchRepository;

    @Autowired
    TableRepository tableRepository;

    @GetMapping(value = "/pois")
    public ResponseEntity<List<Poi>> getAllPois(){
        return new ResponseEntity<>(poiRepository.findAll(), HttpStatus.OK);
    }

    @PostMapping(value = "/benches")
    public ResponseEntity<Poi> postPoi(@RequestBody Bench bench){
        benchRepository.save(bench);
        return new ResponseEntity<>(bench, HttpStatus.CREATED);
    }

    @PostMapping(value = "/tables")
    public ResponseEntity<Poi> postPoi(@RequestBody Table table){
        tableRepository.save(table);
        return new ResponseEntity<>(table, HttpStatus.CREATED);
    }

}
