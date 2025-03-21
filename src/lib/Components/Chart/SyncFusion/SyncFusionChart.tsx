import { Utils } from "../../../Utils";
import { Chart, ChartProps, ChartState } from "../Chart";
import { registerLicense } from '@syncfusion/ej2-base';

/**
 * Syncfusion chart's properties
 */
export interface SyncFusionChartProps extends ChartProps {
    /**
     * The syncfusion license key, for use charts from SyncFusions
     */
    SyncFusionLicenseKey: string,
}

/**
 * Syncfusion chart's state properties
 */
export interface SyncFusionChartState extends ChartState {

}

/**
 * SyncFusion abstract chart class, you need to inherit this class to register SyncFusion License Key
 */
export abstract class SyncFusionChart<Props extends SyncFusionChartProps, State extends SyncFusionChartState> 
extends Chart<Props & SyncFusionChartProps, State & SyncFusionChartState> {

    constructor(props: Props & SyncFusionChartProps, state: State & SyncFusionChartState) {
        super(props, state);
        if (Utils.IsNotEmpty(this.props.SyncFusionLicenseKey)) {
            registerLicense(this.props.SyncFusionLicenseKey);
        }
    }
}