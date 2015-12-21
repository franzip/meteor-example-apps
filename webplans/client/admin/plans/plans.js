Template.editplan.helpers({
    checkValue: function (src, target) {
        if (src == target)
            return 'selected';
    }
});

Template.addplan.events({
    'submit .add-plan-form': function (event) {
        var plan_name   = event.target.plan_name.value,
            plan_label  = event.target.plan_label.value,
            days        = event.target.days.value,
            description = event.target.description.value,
            is_default  = event.target.is_default.value,
            price       = event.target.price.value;

        Plans.insert({
            plan_name: plan_name,
            plan_label: plan_label,
            days: days,
            price: price,
            description: description,
            is_default: is_default
        });

        toastr.success('Plan Added successfully');
        Router.go('/admin/plans');

        return false;
    }
});

Template.editplan.events({
    'submit .edit-plan-form': function (event) {
        var plan_name   = event.target.plan_name.value,
            plan_label  = event.target.plan_label.value,
            days        = event.target.days.value,
            description = event.target.description.value,
            is_default  = event.target.is_default.value,
            price       = event.target.price.value;

        Plans.update({
            _id: this._id
        }, {
            $set: {
                plan_name: plan_name,
                plan_label: plan_label,
                days: days,
                price: price,
                description: description,
                is_default: is_default
            }
        });

        toastr.success('Plan Edited successfully');
        Router.go('/admin/plans');

        return false;
    }
});

Template.listplans.events({
    'click .delete-plan': function (event) {
        if (confirm("Are you sure?")) {
            Plans.remove(this._id);
            toastr.success('Plan Deleted successfully');
            return false;
        }
        return false;
    }
});
