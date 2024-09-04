export interface SwitchProps {
  contrast: boolean;
  active: boolean;
  onChangeSwitch?: (newMode: boolean) => void;
}
