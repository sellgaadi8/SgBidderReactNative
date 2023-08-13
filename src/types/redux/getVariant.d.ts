type VARIANT = 'sgSeller/variant';

type VariantState = {
  success: boolean;
  data: string[];
  called: boolean;
  error: boolean;
};

type VariantAction = {
  type: VARIANT;
  payload: VariantState;
};
