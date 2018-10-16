import {ActionHandler, ActionSnapshot} from 'fbl/dist/src/models';
import * as Joi from 'joi';
import {IContext, IActionHandlerMetadata} from 'fbl/dist/src/interfaces';
//import {Container} from 'typedi';
//import {FlowService} from 'fbl/dist/src/services';

export class PluginActionHandler extends ActionHandler {
    private static metadata = <IActionHandlerMetadata> {
        id: 'namespace.plugin-id',
        version: '1.0.0',
        aliases: [
            // Register aliases for your action handler.
            // You can also override other plugins if you want to by specifying their id or alias in the list,
            // just be careful with the order of loading ;)
            'namespace.plugin-id-alias'
        ]

        // If you want to manually process EJS template inside your options uncomment the following line
        // skipTemplateProcessing: true,

        // If entire options set contains sensitive information - uncomment following line to mask in in report.
        // considerOptionsAsSecrets: true,
    };

    private static validationSchema = Joi.object()
        .min(1)
        .required()
        .options({abortEarly: true});

    getMetadata(): IActionHandlerMetadata {
        return PluginActionHandler.metadata;
    }

    getValidationSchema(): Joi.SchemaLike | null {
        return PluginActionHandler.validationSchema;
    }

    // If your action handler execution should not run for some reason do that check in a method below
    // E.g. you may not want to create a new server instance if one with same id/tag already exists, but
    // you may also don't want to throw error to interrupt the deployment flow.
    // async isShouldExecute(options: any, context: IContext, snapshot: ActionSnapshot): Promise<boolean> {
    //     return true;
    // }

    async execute(options: any, context: IContext, snapshot: ActionSnapshot): Promise<void> {
        // Get file path based on the working directory (that is where flow descriptor file is hosted)
        // const flowService = Container.get(FlowService);
        // const file = flowService.getAbsolutePath(options[name].file, snapshot.wd);

        // log something to be visible in reports
        snapshot.log('Execution complete');

        // Make sure to register any changes you made for options or context in the snapshot (this will help you and your
        // users to debug the flow):
        // snapshot.setOptions(options);
        // snapshot.setContext(context);
    }
}
