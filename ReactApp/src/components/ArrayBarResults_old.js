import React, { useState, useEffect, useRef } from 'react';
import Data from "../data.json";
import { nanoid } from "nanoid";
import axios from 'axios';


const ArrayBarResults = (props) => {

    const { length, force, forceType, maxMoment, maxShearForce, setLength, setForce, setForceType, setMaxMoment, setMaxShearForce } = props;

    // Reference
    const pituusRef = useRef();
    const kuormaRef = useRef();
    const tyyppiRef = useRef();
    const maxMRef = useRef();
    const maxVRef = useRef();

    // State 
    const [tulokset, setTulokset] = useState(Data);
    // Temp State
    const [updateID, setUpdateID] = useState();
    const [updatePituus, setUpdatePituus] = useState();
    const [updateKuorma, setUpdateKuorma] = useState();
    const [updateTyyppi, setUpdateTyyppi] = useState();
    const [updateMaxM, setUpdateMaxM] = useState();
    const [updateMaxV, setUpdateMaxV] = useState();
    /*
    const handleAddFormSubmit = (event) => {
        event.preventDefault();

        const newContact = {
            id: nanoid(),
            pituus: length,
            kuorma: force,
            tyyppi: forceType,
            maxM: maxMoment,
            maxV: maxShearForce,
        };

        const newContacts = [...tulokset, newContact];
        setTulokset(newContacts);
    };
    */

    // Effect
    //////////////////////////////////////////
    useEffect(() => {
        // console.log(data);
        // setDate(Data)
        // clear form fields
        pituusRef.current.value = null;
        kuormaRef.current.value = null;
        tyyppiRef.current.value = null;
        maxMRef.current.value = null;
        maxVRef.current.value = null;
    }, [tulokset]);

    // Add Post
    //////////////////////////////////////////
    const addPost = () => {
        if (length && force) {
            // create new post object
            const newTulos = {
                // id: nanoid(),
                "id": tulokset.length + 1,
                "pituus": length,
                "kuorma": force,
                "tyyppi": forceType,
                "maxM": maxMoment,
                "maxV": maxShearForce
            }
            const uusiContacts = [...tulokset, newTulos];
            setTulokset(uusiContacts);

            // update write to json file
            saveJson(uusiContacts);

        }
    }

    // Delete Post 
    //////////////////////////////////////////
    const deletePost = (key) => {
        // filter out post containing that id
        let filterOutPost = [...tulokset].filter(OBJ => OBJ.id !== key);
        // save the rest in state
        setTulokset(filterOutPost);

        // update write to json file
        saveJson(filterOutPost);
    }

    // Populate Post
    ////////////////////////////////////////// 
    const populatePost = (key, pituus, kuorma, tyyppi, maxM, maxV) => {
        setUpdateID(key);
        setUpdatePituus(pituus);
        setUpdateKuorma(kuorma);
        setUpdateTyyppi(tyyppi);
        setUpdateMaxM(maxM);
        setUpdateMaxV(maxV);
    }

    // Update Post 
    //////////////////////////////////////////
    const updatePost = () => {
        console.log("updateID:", updateID);
        // populate post info from temp state and prepare new object for changed post
        let editedPost = {
            "id": updateID,
            "pituus": updatePituus,
            "kuorma": updateKuorma,
            "tyyppi": updateTyyppi,
            "maxM": updateMaxM,
            "maxV": updateMaxV
        }
        // remove old post with same ID and get the remaining data /// filter 
        let filterPost = [...tulokset].filter(OBJ => OBJ.id !== updateID);
        // prepare object with edited post + remaining data from object above
        let posts = [...filterPost, editedPost];
        // push int state
        setTulokset(posts);

        setUpdateID();
        setUpdatePituus();
        setUpdateKuorma();
        setUpdateTyyppi();
        setUpdateMaxM();
        setUpdateMaxV();

        // update write to json file
        saveJson(posts);
    }

    // Write to JSON File
    //////////////////////////////////////////
    // this function will receive all uodated state / posts after you add, edit delete post
    const saveJson = (uusiContacts) => {
        // api URL // end point from node server / express server
        const url = 'http://localhost:5000/write'
        axios.post(url, uusiContacts)
            .then(response => {
                // console.log(response);
            });
    }

    // Bonus Section
    //////////////////////////////////////////
    // Downloading JSON File
    const saveData = jsonDate => {
        const fileData = JSON.stringify(jsonDate);

        const blob = new Blob([fileData], { type: "text/plain" });
        const url = URL.createObjectURL(blob);
        // create link
        const link = document.createElement('a');
        // point link to file to be downloaded
        link.download = 'newData.json';
        link.href = url;
        // trigger download
        link.click();
    }

    return (
        <div>
            <h3>Tähän taulukko, johon kerätään kaikki laskentatulokset</h3>
            <h4>tulokset tallentuu myös data.json-filuun</h4>
            <table>
                <thead>
                    <tr>
                        <th>Id</th>
                        <th>Pituus [m]</th>
                        <th>Kuorma [kN]</th>
                        <th>Tyyppi</th>
                        <th>Max M</th>
                        <th>Max V</th>
                    </tr>
                </thead>
                <tbody>
                    {
                        tulokset.map(
                            (t) => (
                                <tr key={t.id}>
                                    <td>{t.id}</td>
                                    <td>{t.pituus}</td>
                                    <td>{t.kuorma}</td>
                                    <td>{t.tyyppi}</td>
                                    <td>{t.maxM}</td>
                                    <td>{t.maxV}</td>
                                    <td><button onClick={() => populatePost(t.id, t.pituus, t.kuorma, t.tyyppi, t.maxM, t.maxV)}>Edit</button></td>
                                    <td><button onClick={() => deletePost(t.id)}>Delete</button></td>
                                </tr>

                            )
                        )
                    }

                </tbody>
            </table>



            <h2>Lisää Tulos</h2>
            {/*
                <form onSubmit={handleAddFormSubmit}>
             */
            }

            <input
                type="text"
                name="pituus"
                required="required"
                placeholder="Lisää pituus..."
                value={length}
                onChange={(e) => setLength(e.target.value)}
                ref={pituusRef}
            />
            <input
                type="text"
                name="kuorma"
                required="required"
                placeholder="Lisää kuorma..."
                value={force}
                onChange={(e) => setForce(e.target.value)}
                ref={kuormaRef}
            />
            <input
                type="text"
                name="tyyppi"
                required="required"
                placeholder="Lisää kuormatyyppi..."
                value={forceType}
                onChange={(e) => setForceType(e.target.value)}
                ref={tyyppiRef}
            />
            <input
                type="text"
                name="maxM"
                required="required"
                placeholder="Lisää maksimi momentti..."
                value={maxMoment}
                onChange={(e) => setMaxMoment(e.target.value)}
                ref={maxMRef}
            />
            <input
                type="text"
                name="maxV"
                required="required"
                placeholder="Lisää maksimi leikkausvoima..."
                value={maxShearForce}
                onChange={(e) => setMaxShearForce(e.target.value)}
                ref={maxVRef}
            />
            {/*
                    <button type="submit">Lisää laskettu tulos taulukkoon</button>
                    </form>
                */
            }
            <button onClick={addPost}>Add Post</button>
            <button onClick={e => saveData(tulokset)}>Download Data</button>

            {/* If temp state has got values of title and content for update form show this */}

            {
                updatePituus || updateKuorma ?
                    (
                        <div>
                            <h4>Päivitä Tulos</h4>
                            <input placeholder="Pituus"
                                onChange={e => setUpdatePituus(e.target.value)}
                                value={updatePituus || ''}
                            />
                            <input
                                placeholder="Kuorma"
                                onChange={e => setUpdateKuorma(e.target.value)}
                                value={updateKuorma || ''}
                            />
                            <input
                                placeholder="Tyyppi"
                                onChange={e => setUpdateTyyppi(e.target.value)}
                                value={updateTyyppi || ''}
                            />
                            <input
                                placeholder="MaxM"
                                onChange={e => setUpdateMaxM(e.target.value)}
                                value={updateMaxM || ''}
                            />
                            <input
                                placeholder="MaxV"
                                onChange={e => setUpdateMaxV(e.target.value)}
                                value={updateMaxV || ''}
                            />
                            <br />
                            <button onClick={updatePost}>Update Post</button>
                        </div>
                    )
                    : null
            }

        </div >

    )
}

export default ArrayBarResults
