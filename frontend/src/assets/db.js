import flowRate from "./anim/flowRate.json";
import analyteConc from "./anim/analyteConc.json";
import detectionConc from "./anim/detectionConc.json";
import captureConc from "./anim/captureConc.json";

const info = {
    signalThreshold: {
        title: "Signal Threshold",
        desc: "Signal threshold is ...",
    },
    flowRate: {
        title: "Capillary Flow Rate",
        desc: "Capillary flow rate is the rate at which the fluid passes through the nitrocellulose pores. Most commonly measured as time needed to flow through 4 cm (s/4cm)",
        anim: flowRate,
    },
    length: {
        title: "Length",
        desc: "Length of the nitrocellulose membrane, through which the liquid flows.",
    },
    width: {
        title: "Width",
        desc: "Width of the nitrocellulose membrane, through which the liquid flows.",
    },
    thickness: {
        title: "Thickness",
        desc: "Thickness of the nitrocellulose membrane, through which the liquid flows.",
    },
    aCoef: {
        title: "Analyte Concentration",
        desc: "Analyte concentration is the concentration of the substance we want to detect. It is dissolved in the drop of water applied on to the sample pad.",
        anim: analyteConc,
    },
    pCoef: {
        title: "Detection Probe Concentration",
        desc: "Detection probe concentration is ...",
        anim: detectionConc,
    },
    rCoef: {
        title: "Capture Probe Concentration",
        desc: "Capture probe concentration is ...",
        anim: captureConc,
    },
    initVelocity: {
        title: "Initial Velocity",
        desc: "Initial velocity is ...",
    },
    velocityDecay: {
        title: "Velocity Decay Rate",
        desc: "Velocity decay rate is ...",
    },
    diffusCoef: {
        title: "Analyte Diffusion Coefficient",
        desc: "Analyte diffusion coefficient is ...",
    },
    probeDiffusCoef: {
        title: "Probe Diffusion Coefficient",
        desc: "Probe diffusion coefficient is ...",
    },
    complexDiffusCoef: {
        title: "Complex Diffusion Coefficient",
        desc: "Complex diffusion coefficient is ...",
    },
    assocRate1: {
        title: "Association Rate (A+P)",
        desc: "Association rate is ...",
    },
    dissocRate1: {
        title: "Dissociation Rate (A+P)",
        desc: "Dissociation rate is ...",
    },
    assocRate2: {
        title: "Association Rate (AP+R)",
        desc: "Association rate is ...",
    },
    dissocRate2: {
        title: "Dissociation Rate (AP+R)",
        desc: "Dissociation rate is ...",
    },
    assocRate3: {
        title: "Association Rate (P+R)",
        desc: "Association rate is ...",
    },
    dissocRate3: {
        title: "Dissociation Rate (P+R)",
        desc: "Dissociation rate is ...",
    },
    assocRate4: {
        title: "Association Rate (A+R)",
        desc: "Association rate is ...",
    },
    dissocRate4: {
        title: "Dissociation Rate (A+R)",
        desc: "Dissociation rate is ...",
    },
}
export default info;