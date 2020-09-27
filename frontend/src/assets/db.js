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
        desc: "Analyte Concentration is the concentration of the substance in the drop of water applied to the sample pad.",
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
    assocRate: {
        title: "Association Rate",
        desc: "Association Rate is blah blah blah",
    },
    dissocRate: {
        title: "Dissociation Rate",
        desc: "Dissociation Rate is blah blah blah",
    },
}
export default info;