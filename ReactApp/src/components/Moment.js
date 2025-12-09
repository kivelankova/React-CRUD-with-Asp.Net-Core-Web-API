// import { format } from 'morgan';
import React, { useState, useEffect } from 'react'


const Moment = (props) => {

    const { length,
        lengthA,
        lengthB,
        load,
        pointForce,
        pointMoment,
        force,
        momentChange,
        maxMomentChange,
        forceType,
        formData,
        setFormData,
        arvot,
        maxMomentChange_backend,
        hide
    } = props;

    /*
    // TESTI POISTA
    useEffect(() => {
        console.log("arvot.pituusL :", arvot.pituusL);
        console.log("arvot.kuormaTV :", arvot.kuormaTV);
        //console.log("arvot.pituusL :", arvot.pituusL);
    }, [arvot])
    */

    const [maxMoment, setMaxMoment] = useState("");
    let [moment, setMoment] = useState([]);
    let [barMomentResults, setBarMomentResults] = useState([{ numero: "", pituus: "", kuorma: "", tyyppi: "", maxM: "" }]); // Tähän laitetaan lasketut tulokset
    let L = Number(lengthA) + Number(lengthB);
    let pituusL = 0;
    let pituusA = 0;
    let pituusB = 0;
    let kuormaTV = 0;
    let kuormaPK = 0;
    let kuormaPM = 0;
    let tyyppi = 0;
    let kokonaisPituus = 0;
    let m5_backend = 0;

    const [maxMoment_backend, setMaxMoment_backend] = useState("");

    // Parametri TulosForm.js:stä
    if (arvot) {
        pituusL = arvot.pituusL;
        pituusA = arvot.pituusA;
        pituusB = arvot.pituusB;
        kuormaTV = arvot.kuormaTV;
        kuormaPK = arvot.kuormaPK;
        kuormaPM = arvot.kuormaPM;
        tyyppi = arvot.forceType;
        console.log("tyyppi: ", tyyppi);
    }
    // Palkin momentti
    // tasainen kuorma q [kN/m]
    // M = q*x/2 * (x - L)
    // V = -q/2 * (L + x)
    const calculateMomentLineload = () => {
        // Parametri TulosForm.js:stä
        pituusL = arvot.pituusL;
        pituusA = arvot.pituusA;
        pituusB = arvot.pituusB;
        kuormaTV = arvot.kuormaTV;
        kuormaPK = arvot.kuormaPK;
        kuormaPM = arvot.kuormaPM;
        tyyppi = arvot.forceType;
        // lasketaan momentti-arvot taulukkoon
        let moments = [];

        // TV-mom laskenta kunnossa
        if (forceType == "TV") {
            let m5 = load * (5 * length / 10) * ((5 * length / 10) - length) / 2;

            console.log("max moment [q=force] (1/8*q*L^2):", m5);
            setMaxMoment(m5);

            // haetaan taulukkoon momentin maksimiarvo
            setFormData({ ...formData, maxM: m5 });
            console.log("formData: ", formData);


            let numero = 1;

            for (var i = 0; i <= 20; i++) {
                numero = numero + i;
                let mom = load * (i * length / 20) * ((i * length / 20) - length) / 2;
                moments.push(mom);
                setMoment(moments);
                console.log("moments:", moments);
                console.log("numero:", numero);
                setBarMomentResults()
            }
            momentChange(moments);
            maxMomentChange(m5);

        }
        if (tyyppi == "TV") {
            // backend laskenta
            m5_backend = kuormaTV * (5 * pituusL / 10) * ((5 * pituusL / 10) - pituusL) / 2;
            console.log("m5_backend:", m5_backend); // tulee luku
            setMaxMoment_backend(m5_backend);
            maxMomentChange_backend(m5_backend);
        }
        // PK-mom laskenta kunnossa
        if (forceType == "PK") {
            let m5 = - pointForce * lengthB * lengthA / L;
            console.log("max moment PK:", m5);
            setMaxMoment(m5);
            setFormData({ ...formData, maxM: m5 });
            console.log("formData: ", formData);
            // lasketaan momentti-arvot taulukkoon
            let mom = 0;
            for (var i = 0; i <= 20; i++) {
                if (i * L / 20 <= lengthA) {
                    mom = - pointForce * lengthB * (i * L / 20) / L;
                }
                else if (i * L / 20 > lengthA) {
                    mom = - pointForce * lengthA * (L - (i * L / 20)) / L;
                }
                moments.push(mom);
                setMoment(moments);
                console.log("moments:", moments);
            }

            momentChange(moments);
            maxMomentChange(m5);
        }
        if (tyyppi == "PK") {
            // backend laskenta
            kokonaisPituus = Number(pituusA) + Number(pituusB);
            console.log("kokonaisPituus: ", kokonaisPituus);
            m5_backend = - kuormaPK * pituusB * pituusA / kokonaisPituus;
            console.log("m5_backend:", m5_backend); // tulee luku
            setMaxMoment_backend(m5_backend);
            maxMomentChange_backend(m5_backend);
        }

        // PM-mom laskenta kunnossa
        if (forceType == "PM") {
            let m5 = 0;
            if (lengthA > lengthB) {
                m5 = - pointMoment * lengthA / L;
                console.log("max moment PM:", m5);
                setMaxMoment(m5);
                setFormData({ ...formData, maxM: m5 });
            } else if (lengthA <= lengthB) {
                m5 = - pointMoment * lengthB / L;
                console.log("max moment PM:", m5);
                setMaxMoment(m5);
                setFormData({ ...formData, maxM: m5 });
            }


            // lasketaan momentti-arvot taulukkoon
            let mom = 0;
            for (var i = 0; i <= 20; i++) {
                if (i * L / 20 <= lengthA) {
                    mom = - pointMoment * (i * L / 20) / L;
                }
                else if (i * L / 20 > lengthA) {
                    mom = - pointMoment * ((i * L / 20) - L) / L;
                }
                moments.push(mom);
                setMoment(moments);
                console.log("moments:", moments);
            }

            momentChange(moments);
            maxMomentChange(m5);
        }
        if (tyyppi == "PM") {
            // backend laskenta
            kokonaisPituus = Number(pituusA) + Number(pituusB);
            if (pituusA > pituusB) {
                m5_backend = - kuormaPM * pituusA / kokonaisPituus;
                console.log("m5_backend:", m5_backend); // tulee luku
                setMaxMoment_backend(m5_backend);
                maxMomentChange_backend(m5_backend);
            } else if (pituusA <= pituusB) {
                m5_backend = - kuormaPM * pituusB / kokonaisPituus;
                console.log("m5_backend:", m5_backend); // tulee luku
                setMaxMoment_backend(m5_backend);
                maxMomentChange_backend(m5_backend);
            }
        }

    }

    // Laskee automaattisesti tulokset, kun muuttujat luotu
    useEffect(() => {
        if (tyyppi == "TV") {
            // backend laskenta
            m5_backend = kuormaTV * (5 * pituusL / 10) * ((5 * pituusL / 10) - pituusL) / 2;
            console.log("m5_backend:", m5_backend); // tulee luku
            setMaxMoment_backend(m5_backend);
            maxMomentChange_backend(m5_backend);
        }
        if (tyyppi == "PK") {
            // backend laskenta
            kokonaisPituus = Number(pituusA) + Number(pituusB);
            console.log("kokonaisPituus: ", kokonaisPituus);
            m5_backend = - kuormaPK * pituusB * pituusA / kokonaisPituus;
            console.log("m5_backend:", m5_backend); // tulee luku
            setMaxMoment_backend(m5_backend);
            maxMomentChange_backend(m5_backend);
        }
        if (tyyppi == "PM") {
            // backend laskenta
            kokonaisPituus = Number(pituusA) + Number(pituusB);
            if (pituusA > pituusB) {
                m5_backend = - kuormaPM * pituusA / kokonaisPituus;
                console.log("m5_backend:", m5_backend); // tulee luku
                setMaxMoment_backend(m5_backend);
                maxMomentChange_backend(m5_backend);
            } else if (pituusA <= pituusB) {
                m5_backend = - kuormaPM * pituusB / kokonaisPituus;
                console.log("m5_backend:", m5_backend); // tulee luku
                setMaxMoment_backend(m5_backend);
                maxMomentChange_backend(m5_backend);
            }
        }
    }, [tyyppi != 0])

    return (

        <div>
            {!hide ?
                <div>
                    <button onClick={calculateMomentLineload}>Laske momentti</button>
                </div>
                :
                <div>

                </div>
            }
        </div>

    )
}

export default Moment
