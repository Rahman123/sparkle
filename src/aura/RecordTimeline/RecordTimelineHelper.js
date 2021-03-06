({
	getListRecords : function(cmp) {
    console.log("RecordTimelineHelper.getListRecords: entered");    
        
	var action = cmp.get("c.getListRecords");
        action.setParams({ 
            recordID : cmp.get("v.recordId"),
            rowsLimit : cmp.get("v.limitRows"), 
            objectApiName : cmp.get("v.objectApiName"),
            filter1Field : cmp.get("v.filter1_fieldapiname"),
            filter1Value : cmp.get("v.filter1_fieldValue"),
            objectDateFieldName : cmp.get("v.objectDateFieldName"),
            objectDisplayDateFieldName : cmp.get("v.objectDateDisplayFieldName"),
            parentObjectIDFieldName : cmp.get("v.parentObjectIDFieldName"),
            detail1FieldAPIName : cmp.get("v.detail1FieldAPIName"),
            detail2FieldAPIName : cmp.get("v.detail2FieldAPIName"),
            titleFieldAPIName : cmp.get("v.titleFieldAPIName"),
            subtitleFieldAPIName : cmp.get("v.subtitleFieldAPIName")
        });

        // Create a callback that is executed after 
        // the server-side action returns
        action.setCallback(this, function(response) {
            var state = response.getState();
            // This callback doesn’t reference cmp. If it did,
            // you should run an isValid() check
            //if (cmp.isValid() && state === "SUCCESS") {
            if (state === "SUCCESS") {
                cmp.set("v.lstRecords", response.getReturnValue());
				
                var lstRecs = cmp.get("v.lstRecords");
                cmp.set("v.listSize", lstRecs.length);
                // You would typically fire a event here to trigger  
                // client-side notification that the server-side 
                // action is complete
            }
            //else if (cmp.isValid() && state === "INCOMPLETE") {
            else if (state === "INCOMPLETE") {
                // do something
            }
            //else if (cmp.isValid() && state === "ERROR") {
            else if (state === "ERROR") {
                var errors = response.getError();
                if (errors) {
                    if (errors[0] && errors[0].message) {
                        console.log("Error message: " + 
                                 errors[0].message);
                    }
                } else {
                    console.log("Unknown error");
                }
            }
        });

        // optionally set storable, abortable, background flag here

        // A client-side action could cause multiple events, 
        // which could trigger other events and 
        // other server-side action calls.
        // $A.enqueueAction adds the server-side action to the queue.
        $A.enqueueAction(action);
        
        console.log("RecordTimelineHelper.getListRecords: exit"); 
    }
})