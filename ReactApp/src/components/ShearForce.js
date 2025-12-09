import React, { useState, useEffect } from 'react'


const ShearForce = (props) => {

    const { length,
        lengthA,
        lengthB,
        load,
        pointForce,
        pointMoment,
        force,
        shearChange,
        maxShearChange,
        forceType,
        formData,
        setFormData,
        arvot,
        maxShearChange_backend,
        hide
    } = props;
    const [maxShearForce, setMaxShearForce] = useState("");
    let [shearForce, setshearForce] = useState([]);
    let s5 = 0;
    let L = Number(lengthA) + Number(lengthB);
    let pituusL = 0;
    let pituusA = 0;
    let pituusB = 0;
    let kuormaTV = 0;
    let kuormaPK = 0;
    let kuormaPM = 0;
    let tyyppi = 0;
    let kokonaisPituus = 0;
    let s5_backend = 0;

    const [maxShear_backend, setMaxShear_backend] = useState("");

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
    // V = -q/2 * (L + x)
    const calculateShearForce = () => {
        // Parametri TulosForm.js:stä
        pituusL = arvot.pituusL;
        pituusA = arvot.pituusA;
        pituusB = arvot.pituusB;
        kuormaTV = arvot.kuormaTV;
        kuormaPK = arvot.kuormaPK;
        kuormaPM = arvot.kuormaPM;
        tyyppi = arvot.forceType;
        console.log("tyyppi: ", tyyppi);
        // lasketaan leikausvoima-arvot taulukkoon
        let shearForces = [];


        // TV-mom laskenta kunnossa
        if (forceType == "TV") {
            s5 = - load * (length) / 2;
            console.log("max shearForce:", s5);
            setMaxShearForce(s5);
            // haetaan taulukkoon leikkausvoiman maksimiarvo
            setFormData({ ...formData, maxV: s5 });

            for (var i = 0; i <= 20; i++) {
                let shear = - load * (length - 2 * (i * length / 20)) / 2;
                shearForces.push(shear);
                setshearForce(shearForces);
                console.log("shearForces:", shearForces);
            }

            shearChange(shearForces);
            maxShearChange(s5);
        }
        if (tyyppi == "TV") {
            // backend laskenta
            s5_backend = - kuormaTV * (pituusL) / 2;
            console.log("s5_backend:", s5_backend); // tulee luku
            setMaxShear_backend(s5_backend);
            maxShearChange_backend(s5_backend);
        }
        // PK-shear laskenta kunnossa
        if (forceType == "PK") {
            if (lengthA > lengthB) {
                s5 = - pointForce * lengthA / L;
                console.log("max shearForce:", s5);
                setMaxShearForce(s5);
                setFormData({ ...formData, maxV: s5 });
            } else if (lengthA <= lengthB) {
                s5 = - pointForce * lengthB / L;
                console.log("max shearForce:", s5);
                setMaxShearForce(s5);
                setFormData({ ...formData, maxV: s5 });
            }

            for (var i = 0; i <= 20; i++) {
                let shear = 0;
                if (i * L / 20 <= lengthA) {
                    shear = - pointForce * lengthB / L;
                }
                else if (i * L / 20 >= lengthA) {
                    shear = pointForce * lengthA / L;
                }

                shearForces.push(shear);
                setshearForce(shearForces);
                console.log("shear:", shear);
            }

            shearChange(shearForces);
            maxShearChange(s5);
        }
        if (tyyppi == "PK") {
            // backend laskenta

            kokonaisPituus = Number(pituusA) + Number(pituusB);
            if (pituusA > pituusB) {
                s5_backend = - kuormaPK * (pituusA) / kokonaisPituus;
                console.log("s5_backend:", s5_backend); // tulee luku
                setMaxShear_backend(s5_backend);
                maxShearChange_backend(s5_backend);
            } else if (pituusA <= pituusB) {
                console.log(kuormaPK);
                console.log(pituusB);
                console.log(kokonaisPituus);
                s5_backend = - kuormaPK * (pituusB) / kokonaisPituus;
                console.log("s5_backend:", s5_backend); // tulee luku
                setMaxShear_backend(s5_backend);
                maxShearChange_backend(s5_backend);
            }
        }

        // PM-shear laskenta kunnossa
        if (forceType == "PM") {

            s5 = - pointMoment / L;
            console.log("max shearForce:", s5);
            setMaxShearForce(s5);
            setFormData({ ...formData, maxV: s5 });

            for (var i = 0; i <= 20; i++) {
                let shear = 0;
                shear = - pointMoment / L;
                shearForces.push(shear);
                setshearForce(shearForces);
                console.log("shearForces:", shearForces);
            }

            shearChange(shearForces);
            maxShearChange(s5);
        }
        if (tyyppi == "PM") {
            // backend laskenta
            kokonaisPituus = Number(pituusA) + Number(pituusB);
            s5_backend = - kuormaPM / kokonaisPituus;
            console.log("s5_backend:", s5_backend); // tulee luku
            setMaxShear_backend(s5_backend);
            maxShearChange_backend(s5_backend);
        }


    }

    // Laskee automaattisesti tulokset, kun muuttujat luotu
    useEffect(() => {
        if (tyyppi == "TV") {
            // backend laskenta
            s5_backend = - kuormaTV * (pituusL) / 2;
            console.log("s5_backend:", s5_backend); // tulee luku
            setMaxShear_backend(s5_backend);
            maxShearChange_backend(s5_backend);
        }
        if (tyyppi == "PK") {
            // backend laskenta

            kokonaisPituus = Number(pituusA) + Number(pituusB);
            if (pituusA > pituusB) {
                s5_backend = - kuormaPK * (pituusA) / kokonaisPituus;
                console.log("s5_backend:", s5_backend); // tulee luku
                setMaxShear_backend(s5_backend);
                maxShearChange_backend(s5_backend);
            } else if (pituusA <= pituusB) {
                console.log(kuormaPK);
                console.log(pituusB);
                console.log(kokonaisPituus);
                s5_backend = - kuormaPK * (pituusB) / kokonaisPituus;
                console.log("s5_backend:", s5_backend); // tulee luku
                setMaxShear_backend(s5_backend);
                maxShearChange_backend(s5_backend);
            }
        }
        if (tyyppi == "PM") {
            // backend laskenta
            kokonaisPituus = Number(pituusA) + Number(pituusB);
            s5_backend = - kuormaPM / kokonaisPituus;
            console.log("s5_backend:", s5_backend); // tulee luku
            setMaxShear_backend(s5_backend);
            maxShearChange_backend(s5_backend);
        }
    }, [tyyppi != 0])


    return (
        <div>
            {!hide ?
                <div>
                    <button onClick={calculateShearForce}>Laske leikkausvoima</button>
                </div>
                :
                <div>

                </div>
            }
        </div>




    )
}

export default ShearForce
