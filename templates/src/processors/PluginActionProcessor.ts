import { ActionProcessor } from "fbl";
import * as Joi from 'joi';

export class PluginActionProcessor extends ActionProcessor {
    private static validationSchema = Joi.object()
        .min(1)
        .required()
        .options({abortEarly: true});

    getValidationSchema(): Joi.SchemaLike | null {
        return PluginActionProcessor.validationSchema;
    }

     // If your action handler execution should not run for some reason do that check in a method below
    // E.g. you may not want to create a new server instance if one with same id/tag already exists, but
    // you may also don't want to throw error to interrupt the deployment flow.
    // async isShouldExecute(): Promise<boolean> {
    //     return true;
    // }

    async execute(): Promise<void> {
        // Get file path based on the working directory (that is where flow descriptor file is hosted)
        // const flowService = Container.get(FlowService);
        // const file = flowService.getAbsolutePath(options[name].file, snapshot.wd);

        // log something to be visible in reports
        this.snapshot.log('Execution complete');

        // Make sure to register any changes you made for options or context in the snapshot (this will help you and your
        // users to debug the flow):
        // this.snapshot.setOptions(options);
        // this.snapshot.setContext(context);
    }
}