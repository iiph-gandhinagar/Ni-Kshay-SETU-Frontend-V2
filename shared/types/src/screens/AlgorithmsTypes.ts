import {
  DiagnosisDependentApiResponse,
  DiagnosisMasterNodeApiResponse,
} from './DiagnosisTypes';

export interface AlgorithmsTypes {
  get_dynamic_master_nodes: DiagnosisMasterNodeApiResponse | undefined;
  get_dynamic_dependent_node: DiagnosisDependentApiResponse;

  algorithm_diagnosis_master_node: DiagnosisMasterNodeApiResponse | undefined;
  algorithm_diagnosis_dependent_node: DiagnosisDependentApiResponse;

  algorithm_treatment_master_node: DiagnosisMasterNodeApiResponse | undefined;
  algorithm_treatment_dependent_node: DiagnosisDependentApiResponse;

  algorithm_guidance_drug_reaction_master_node:
    | DiagnosisMasterNodeApiResponse
    | undefined;
  algorithm_guidance_drug_reaction_dependent_node: DiagnosisDependentApiResponse;

  algorithm_latent_tb_infection_master_node:
    | DiagnosisMasterNodeApiResponse
    | undefined;
  algorithm_latent_tb_infection_dependent_node: DiagnosisDependentApiResponse;

  algorithm_differential_care_master_node:
    | DiagnosisMasterNodeApiResponse
    | undefined;
  algorithm_differential_care_dependent_node: DiagnosisDependentApiResponse;

  algorithm_cgc_intervention_master_node:
    | DiagnosisMasterNodeApiResponse
    | undefined;
  algorithm_cgc_intervention_dependent_node: DiagnosisDependentApiResponse;
}
