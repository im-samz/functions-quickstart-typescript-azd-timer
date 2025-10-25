import { app, InvocationContext, Timer } from '@azure/functions';

/**
 * Timer-triggered Azure Function that demonstrates scheduled execution.
 * 
 * Timer-triggered function that executes on a schedule defined by TIMER_SCHEDULE app setting.
 * 
 * The runOnStartup: true parameter is useful for development and testing as it triggers
 * the function immediately when the host starts, but should typically be set to false
 * in production to avoid unexpected executions during deployments or restarts.
 */
export async function timerFunction(myTimer: Timer, context: InvocationContext): Promise<void> {
    context.log(`TypeScript Timer trigger function executed at: ${new Date().toISOString()}`);

    if (myTimer.isPastDue) {
        context.warn("The timer is running late!");
    }
}

app.timer('timerFunction', {
    schedule: '%TIMER_SCHEDULE%',
    runOnStartup: true,
    handler: timerFunction
});