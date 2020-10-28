import flowRate from "./anim/flowRate.json";
import analyteConc from "./anim/analyteConc.json";
import detectionConc from "./anim/detectionConc.json";
import captureConc from "./anim/captureConc.json";

const info = {
    flowRate: {
        title: "Capillary Flow Rate",
        desc: "Capillary Flow Rate is the rate at which the fluid passes through the nitrocellulose pores. Most commonly measured as time needed to flow through 4 cm (s/4cm)",
        anim: flowRate,
    },
    diffusCoef: {
        title: "Diffusion Coefficient",
        desc: "Diffusion Coefficient is blah blah blah",
    },
    aCoef: {
        title: "Analyte Concentration",
        desc: "Analyte Concentration is the concentration of the substance we want to detect. It is dissolved in the drop of water applied on to the sample pad.",
        anim: analyteConc,
    },
    pCoef: {
        title: "Detection Probe Concentration",
        desc: "Detection Probe Concentration is blah blah blah",
        anim: detectionConc,
    },
    rCoef: {
        title: "Capture Probe Concentration",
        desc: "Capture Probe Concentration is blah blah blah",
        anim: captureConc,
    },
    assocRate1: {
        title: "Association Rate (A+P)",
        desc: "Association Rate is blah blah blah",
    },
    dissocRate1: {
        title: "Dissociation Rate (A+P)",
        desc: "Dissociation Rate is blah blah blah",
    },
    assocRate2: {
        title: "Association Rate (AP+R)",
        desc: "Association Rate is blah blah blah",
    },
    dissocRate2: {
        title: "Dissociation Rate (AP+R)",
        desc: "Dissociation Rate is blah blah blah",
    },
    assocRate3: {
        title: "Association Rate (P+R)",
        desc: "Association Rate is blah blah blah",
    },
    dissocRate3: {
        title: "Dissociation Rate (P+R)",
        desc: "Dissociation Rate is blah blah blah",
    },
    assocRate4: {
        title: "Association Rate (A+R)",
        desc: "Association Rate is blah blah blah",
    },
    dissocRate4: {
        title: "Dissociation Rate (A+R)",
        desc: "Dissociation Rate is blah blah blah",
    },
    koffiDb: {
        title: "Rates from the Database",
        desc: "Get rates from the koffidb.org database.",
    }
}
export default info;