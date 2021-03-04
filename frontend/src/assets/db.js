import React from 'react';

import flowRate from "./anim/flowRate.json";
import analyteConc from "./anim/analyteConc.json";
import detectionConc from "./anim/detectionConc.json";
import captureConc from "./anim/captureConc.json";

const info = {
    signalThreshold: {
        title: "Signal Threshold",
        desc: "Signal threshold is the coefficient, which defines the optimal required analyte and detection probe complex (PA) equilibrium concentration. It is needed, because the maximum equilibrium concentration is practically unreachable (or may take a very long time).",
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
        desc: "Detection probe concentration is the concentration of the substance which interacts with the analyte to mark it and make it visible on the test line",
        anim: detectionConc,
    },
    rCoef: {
        title: "Capture Probe Concentration",
        desc: "Capture probe concentration is the concentration of the substance which captures the marked analyte (an analyte, which has a detection probe attatched to it) and accumulates it on the test line. Afterwards with sufficient analyte-detection-capture probe concentration the test line becomes visible.",
        anim: captureConc,
    },
    initVelocity: {
        title: "Initial Velocity",
        desc: "Initial velocity is the initial flow rate of the wetting front profile.",
    },
    velocityDecay: {
        title: "Velocity Decay Rate",
        desc: (<>Velocity decay rate is the rate at which the capilary flow slows down. The inverse of velocity decay rate shows the time after which the flow rate slows down by 36.7%. <b>Note:</b> set the velocity decay rate to zero if a constant capillary flow rate is preferred.</>),
    },
    diffusCoef: {
        title: "Analyte Diffusion Coefficient",
        desc: "Analyte diffusion coefficient is the effective diffusion coefficient, which describes diffusion of the analyte through the porous nitrocellulose membrane.",
    },
    probeDiffusCoef: {
        title: "Probe Diffusion Coefficient",
        desc: "Probe diffusion coefficient is the effective diffusion coefficient, which describes diffusion of the detection probe through the porous nitrocellulose membrane.",
    },
    complexDiffusCoef: {
        title: "Complex Diffusion Coefficient",
        desc: "Complex diffusion coefficient is the effective diffusion coefficient, which describes diffusion of the analyte-detection probe complex through the porous nitrocellulose membrane.",
    },
    assocRate1: {
        title: "Association Rate (A+P)",
        desc: "A+P association rate is the rate of the analyte (A) and detection probe (P) complex formation (A+P), i.e. the number of AP complexes formed per second in a one molar solution of A and P.",
    },
    dissocRate1: {
        title: "Dissociation Rate (A+P)",
        desc: "A+P dissociation rate is the rate at which the analyte (A) and detection probe (P) complex (A+P) decays per second, i.e. the number of A+P complexes decayed per second.",
    },
    assocRate2: {
        title: "Association Rate (AP+R)",
        desc: "AP+R association rate is the rate of the analyte-detection probe (AP) and capture probe (R) complex formation (AP+R), i.e. the number of APR complexes formed per second in a one molar solution of AP and R.",
    },
    dissocRate2: {
        title: "Dissociation Rate (AP+R)",
        desc: "AP+R dissociation rate is the rate at which the analyte-detection probe (AP) and capture probe (R) complex (AP+R) decays per second, i.e. the number of AP+R complexes decayed per second.",
    },
    assocRate3: {
        title: "Association Rate (P+R)",
        desc: "P+R association rate is the rate of the detection probe complex (P) and capture probe (R) complex formation (P+R), i.e. the number of PR complexes formed per second in a one molar solution of P and R.",
    },
    dissocRate3: {
        title: "Dissociation Rate (P+R)",
        desc: "P+R dissociation rate is the rate at which the detection probe (P) and capture probe (R) complex (P+R) decays per second, i.e. the number of P+R complexes decayed per second.",
    },
    assocRate4: {
        title: "Association Rate (A+R)",
        desc: (<>A+R association rate is the rate of the analyte (A) and capture probe (R) formation (A+R), i.e. the number of AR complexes formed per second in a one molar solution of A and R. This parameter is used only if the analyte can interact with the capture probe (this parameter is unnecessary if the detection probe is a gold nanoparticle). <b>Note:</b> Set this parameter to zero if the analyte cannot interact with the capture probe in your system.</>),
    },
    dissocRate4: {
        title: "Dissociation Rate (A+R)",
        desc: (<>A+R dissociation rate is the rate at which the analyte-detection probe (A) and capture probe (R) complex (A+R) decays per second, i.e. the number of A+R complexes decayed per second. This parameter is used only if the analyte can interact with the capture probe (this parameter is unnecessary if the detection probe is a gold nanoparticle). <b>Note:</b> Set this parameter to zero if the analyte cannot interact with the capture probe in your system.</>),
    },
}
export default info;