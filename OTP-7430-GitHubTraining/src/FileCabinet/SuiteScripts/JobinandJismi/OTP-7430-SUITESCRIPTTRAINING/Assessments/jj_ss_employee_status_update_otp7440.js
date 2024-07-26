/**
 * @NApiVersion 2.1
 * @NScriptType ScheduledScript
 */
define(['N/format', 'N/record', 'N/runtime', 'N/search'],
    /**
 * @param{format} format
 * @param{record} record
 * @param{runtime} runtime
 * @param{search} search
 */
    (format, record, runtime, search) => {

        /**
         * Defines the Scheduled script trigger point.
         * @param {Object} scriptContext
         * @param {string} scriptContext.type - Script execution context. Use values from the scriptContext.InvocationType enum.
         * @since 2015.2
         */
        const execute = (scriptContext) => {
            try{
                let date = new Date;
                let tDate = date.getDate();
                let month = date.getMonth()+1;
                let year = date.getFullYear();
                let currentDate = month+'/'+tDate+'/'+year;
                let today = new Date(currentDate);
                log.debug('Todays Date:',today);


                let empSrch = search.create({
                    type: 'customrecord_jj_employee_details',
                    // filters:['mainline','is','T'],
                    columns:['custrecord_jj_employee_name','custrecord_jj_status','custrecord_jj_vacation_start_date','custrecord_jj_start_date','internalid']
                });

                empSrch.run().each(function(result){

                    let name = result.getText('custrecord_jj_employee_name');
                    log.debug('Employee name:',name);

                    let empId = result.getValue('internalid');
                    log.debug('Employee id:',empId);

                    let status = result.getText('custrecord_jj_status');
                    log.debug('Status:',status);

                    let vacaDate = result.getValue('custrecord_jj_vacation_start_date');
                    let vaDate = new Date(vacaDate);
                    log.debug('Vacation start date:',vaDate);

                    let proDate = result.getValue('custrecord_jj_start_date');
                    let probaDate = new Date(proDate);
                    log.debug('Probagationary Date:',probaDate);

                    let vacaDay = (today.getTime() - vaDate.getTime())/(1000 * 60 * 60 * 24);
                    log.debug('Days of vacation:',vacaDay);

                    let proDay = (today.getTime() - probaDate.getTime())/(1000 * 60 * 60 * 24);
                    log.debug('Probagationary days :',proDay);

                    if(status ==='Active' && vacaDay > 10){

                        record.submitFields({
                            type: 'customrecord_jj_employee_details',
                            id: empId,
                            values: {'custrecord_jj_status':2}
                        });
                    }
                    else if(status === 'Inactive' && proDay > 90){
                        record.submitFields({
                            type: 'customrecord_jj_employee_details',
                            id: empId,
                            values: {'custrecord_jj_status':4}
                        });
                    }

                    return true;
                })
            }
            catch(e){
                log.error('Error found:',e.message);
            };
        };

        return {execute}

    });
