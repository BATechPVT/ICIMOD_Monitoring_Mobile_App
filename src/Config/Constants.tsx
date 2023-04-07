export const userData = 'USER_DATA';
export const statusCodes = {
  SUCCESS: 200,
  UN_AUTHORIZED: 401,
  BAD_REQUEST: 400,
};
export const dataTypes = {
  addMonitoring: 'ADD_MONITORING',
  viewMonitoring: 'VIEW_MONITORING',
};

export enum VIEW_TYPE {
  DROPDOWN=1,
  INPUT=2,
  RADIO=3
}

export enum INPUT_TYPE {
  NUMBER=1
}

export const MAPPING = {
  1 : [//Closure of depleted
      {
          Label:'Are Terms And Conditions Followed?',
          Key:'are_Terms_And_Conditions_Followed',
          Type:VIEW_TYPE.RADIO,
          Options:['Yes','No'],
          Value:''
      },
      {
          Label:'Follow Up Of The Activity',
          Key:"follow_up_of_the_activity",
          Type:VIEW_TYPE.RADIO,
          Options:['Yes','No'],
          Value:''
      },
      {
          Label:'Suitability Of Species',
          Key:"suitabilityOfspecies",
          Type:VIEW_TYPE.INPUT,
          InputType:INPUT_TYPE.NUMBER,
          Value:''
      },
      {
          Label:'Effects On The Forest',
          Key:"effects_on_the_forest",
          Type:VIEW_TYPE.INPUT,
          Value:''
      }
  ],
  2:[//Planting multi purpose
      {
          Label:'Plants Specie',
          Key:'specie_Planted',
          Type:VIEW_TYPE.INPUT,
          Value:''
      },
      {
          Label:'Average Plant Height',
          Key:'spacing_Between_Plants',
          Type:VIEW_TYPE.INPUT,
          InputType:INPUT_TYPE.NUMBER,
          Value:''
      },
      {
          Label:'Average Plant Diameter',
          Key:'size_Of_Plants',
          Type:VIEW_TYPE.INPUT,
          InputType:INPUT_TYPE.NUMBER,
          Value:''
      },
      {
          Label:'No of Plants',
          Key:'no_Of_Species_Planted',
          Type:VIEW_TYPE.INPUT,
          InputType:INPUT_TYPE.NUMBER,
          Value:''
      },
      {
          Label:'Protection Mechanism',
          Key:'protection_mechanism',
          Type:VIEW_TYPE.INPUT,
          Value:''
      },
      {
          Label:'Source of Irrigation',
          Key:'source_Of_Irrigation',
          Type:VIEW_TYPE.INPUT,
          Value:''
      }
  ],
  3: [//Rehabilitation of degraded
      {
          Label:'Is Establishment Of Community Based Watershed Management Plan Prepared?',
          Key:'establishment_of_community_based_watershed_management_plan_prepared',
          Type:VIEW_TYPE.RADIO,
          Options:['Yes','No'],
          Value:''
      },
      {
          Label:'Impact In Terms Of Environment, DRR & Livelihoods, Check Damming & Bio-engineering Activities',
          Key:'impact_terms_of_Environment_DRR_and_livelihoods_check_damming_and_Bio_engineering_activities',
          Type:VIEW_TYPE.INPUT,
          Value:''
      }
  ],
  4: [//Reclamation/Rehabilitation of bad sites through soil water conservation measures, bio-engineering structures and planting ofdrought resistant species
      {
        Label:'Are Suitable Species Raised?',
        Key:'suitability_of_the_activity_carried_out',
        Type:VIEW_TYPE.RADIO,
        Options:['Yes','No'],
        Value:''
      },
      {
        Label:'Suitability Of The Activity Carried Out (%)',
        Key:'any_adoptive_Research_Development_activities',
        Type:VIEW_TYPE.INPUT,
        InputType:INPUT_TYPE.NUMBER,
        Value:''
      },
      {
        Label:'Any Adoptive Research Development Activities',
        Key:'suitable_species_raised',
        Type:VIEW_TYPE.INPUT,
        Value:''
      }
  ],
  5: [//Reclamation of saline and water logged areas
    {
      Label:'Design And Suitability Of Interventions',
      Key:'design_and_suitability_of_interventions',
      Type:VIEW_TYPE.INPUT,
      Value:''
    },
    {
      Label:'Effectiveness',
      Key:'effectiveness',
      Type:VIEW_TYPE.INPUT,
      Value:''
    }
  ],
  6: [//Planting of road, canal and railway tracts
    {
        Label:'Suitability Of species (%) ',
        Key:'suitabilityOfspecies',
        Type:VIEW_TYPE.INPUT,
        InputType:INPUT_TYPE.NUMBER,
        Value:''
    },
    {
        Label:'Landscape Approach Followed And Choice Of Species',
        Key:'landscape_approach_followed_and_choice_of_species',
        Type:VIEW_TYPE.INPUT,
        InputType:INPUT_TYPE.NUMBER,
        Value:''
    },
    {
        Label:'Aesthetic Plantation Layout',
        Key:'aesthetic_plantation_layout',
        Type:VIEW_TYPE.INPUT,
        InputType:INPUT_TYPE.NUMBER,
        Value:''
    }
  ],
  7: [//Improvement of Rangelands and Pastures
    {
      Label :"Grazing And Browsing Control",
      Key:'grazing_browsing_control',
      Type:VIEW_TYPE.INPUT,
      Value:''
    },
    {
      Label :"Grazing Systems",
      Key:'grazing_systems',
      Type:VIEW_TYPE.INPUT,
      Value:''
    },
    {
      Label :"Range Improvement Techniques",
      Key:'range_improvement_techniques',
      Type:VIEW_TYPE.INPUT,
      Value:''
    },
    {
      Label :"Trespassing",
      Key:'trespassing',
      Type:VIEW_TYPE.INPUT,
      Value:''
    },
    {
      Label :"Extent Of Management And Rehabilitation Of The Selected Sites",
      Key:'extent_of_management_and_rehabilitation_of_the_selected_sites',
      Type:VIEW_TYPE.INPUT,
      Value:''
    }
  ],
  8 :[//Farm Forestry & Agro – Forestry
    {
      Label:'Involvement Of The Community?',
      Key:'involvement_of_the_community',
      Type:VIEW_TYPE.RADIO,
      Options:['Yes','No'],
      Value:''
    },
    {
      Label :"Random Verification Of 10% Planting Stock Distribution (%)",
      Key:'random_verification_of_planting_stock_distribution',
      Type:VIEW_TYPE.INPUT,
      InputType:INPUT_TYPE.NUMBER,
      Value:''
    },
    {
      Label :"Process Of Distribution",
      Key:'process_of_distribution',
      Type:VIEW_TYPE.INPUT,
      Value:''
    }
  ],
  9: [//Promotion of Forest based cottage industries related to Mazri and Kana
    {
      Label:'Mechanism Followed For Value Chain Development And Its Impact On The Local Socio-Economic Conditions',
      Key:'mechanism_followed_development_impact_socio_economic_conditions',
      Type:VIEW_TYPE.INPUT,
      Value:''
    },
    {
      Label:'Physical Verification As Per The Approved Work Plan',
      Key:'physicalverification_approved_workplan',
      Type:VIEW_TYPE.INPUT,
      Value:''
    }
  ],
  10: [//Promotion of non-timber forest products like medicinal plants, mushrooms and honey
    {
      Label:'Community Involvement In NTFP Activities & Its Contribution To Local Economic Uplift',
      Key:'involvementofcommunity_NTFP_activities_contribution_local_economic_uplift',
      Type:VIEW_TYPE.RADIO,
      Options:['Yes','No'],
      Value:''
    },
    {
      Label:'Value Addition Through Awareness And Capacity Building',
      Key:'value_addition_awareness_capacity_building',
      Type:VIEW_TYPE.RADIO,
      Options:['Yes','No'],
      Value:''
    },
    {
      Label :"To Monitor Backward And Forward Linkages That Impact Local Economy And Establish Entrepreneurship",
      Key:'to_monitor_backward_impact_local_economy_establish_entrepreneurship',
      Type:VIEW_TYPE.INPUT,
      Value:''
    },
    {
      Label :"Management Plan Of NTFP",
      Key:'management_plan_of_NTFP',
      Type:VIEW_TYPE.INPUT,
      Value:''
    }
  ],
  11: [//Establishment of Central Model Nurseries
    {
      Label :"Suitability (%) ",
      Key:'suitability',
      Type:VIEW_TYPE.INPUT,
      InputType:INPUT_TYPE.NUMBER,
      Value:''
    },
    {
      Label:'Size Of Plantable Suitable Plants',
      Key:'size_of_plantable_suitable_plants',
      Type:VIEW_TYPE.INPUT,
      Options:[],
      Value:''
    },
    {
      Label:'Value Addition Through Awareness And Capacity Building',
      Key:'area',
      Type:VIEW_TYPE.RADIO,
      Options:['Yes','No'],
      Value:''
    },
    {
      Label :"To Monitor Backward And Forward Linkages That Impact Local Economy And Establish Entrepreneurship",
      Key:'layout',
      Type:VIEW_TYPE.INPUT,
      Value:''
    }
  ],
  12: [//Tube nursery Bare-rooted nurser
    {
      Label :"Health Of Plants, General Maintenance Of The Nursery (%) ",
      Key:'health_of_plants_general_maintenance_of_the_nursery',
      Type:VIEW_TYPE.INPUT,
      InputType:INPUT_TYPE.NUMBER,
      Value:''
    },
    {
      Label :"Weeding Effects",
      Key:'weedingeffects',
      Type:VIEW_TYPE.INPUT,
      Value:''
    }
  ],
  13: [//Establishment of private forest nurseries
    {
      Label :"Followed Instructions Issued By The PMU Vide Letter No300-02/BTP Dated 6/1/2015",
      Key:'followed_Instructions_PMU_vide_letter',
      Type:VIEW_TYPE.RADIO,
      Options:['Yes','No'],
      Value:''
    },
    {
      Label :"Selection Of Suitable Tree Species",
      Key:'selection_of_suitable_tree_species',
      Type:VIEW_TYPE.RADIO,
      Options:['Yes','No'],
      Value:''
    },
    {
      Label :"Identification And Nomination Of Local Community Organization Of Target Communities Through Resolution",
      Key:'identification_nomination_community_organization_communities_resolution',
      Type:VIEW_TYPE.INPUT,
      Value:''
    },
    {
      Label :"Ensure Well Designed Bare-Root Lifting, Root-Trimming, Packaging, Storage And Transport System. Similarly For Tube Plants",
      Key:'ensure_designed_bare_root_lifting_roottrimming_packaging_storage_system_Similarly_tube_plants',
      Type:VIEW_TYPE.INPUT,
      Value:''
    }
  ],
  14: [//Capacity building of farmer communities and entrepreneurs
    {
      Label :"Training Material?",
      Key:'trainingmaterial',
      Type:VIEW_TYPE.RADIO,
      Options:['Yes','No'],
      Value:''
    },
    {
      Label :"Effect And Impact",
      Key:'effect_and_impact',
      Type:VIEW_TYPE.INPUT,
      Value:''
    },
    {
      Label :"Execution Mechanism Of Capacity Building",
      Key:'execution_mechanism_of_capacity_building',
      Type:VIEW_TYPE.INPUT,
      Value:''
    }
  ],
  15: [//Support Activities of Integrated Specialized Units(Directorates)
    {
      Label :"All ISUs Activities Will Be Monitored And Evaluated As Per Their Work Plans",
      Key:'all_ISUs_activities_monitored_evaluated_per_their_work_plans',
      Type:VIEW_TYPE.INPUT,
      Value:''
    },
    {
      Label :"Impacts And Changes In Environment",
      Key:'impacts_changes_environment',
      Type:VIEW_TYPE.INPUT,
      Value:''
    }
  ] 
}
