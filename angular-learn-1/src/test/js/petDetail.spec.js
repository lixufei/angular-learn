describe('pet detail directive', function(){
    var element, scope;

    beforeEach(module('app'));

    beforeEach(inject(function(_$compile_, _$rootScope_, _$templateCache_){
//        _$templateCache_.put('/views/partials/pet-detail.html', '<section><h3>Pet {{pet.name}} detail:</h3><ul><li><label>name:</label><span>{{pet.name}}</span></li><li><label>gender:</label><span>{{pet.gender}}</span></li><li><label>type:</label><span>{{pet.type}}</span></li></ul><button ng-click="backFunc({message: \'koly\'})">back</button></section>');
    
        scope = _$rootScope_.$new();
        scope.pet = {
            id: 1,
            name: 'bingo',
            gender: 'male',
            type: 'cat'
        };
        scope.back = function(){};
        console.log('compiling');
        var linkFunc = _$compile_('<pet-detail pet="pet" back-func="back()"></pet-detail>');
        console.log('link func', linkFunc);
        element = linkFunc(scope);
        console.log('compiling done', element.html());
        scope.$digest();
        console.log('first digesting..', element.html());
    }));

    it('should show pet details', function(){
        console.log('element', element.find('ul li'));
        var gender = angular.element(element.find('ul li')[1]);
        expect(element.find('ul li:first').text()).toBe('name:bingo');
        expect(gender.text()).toBe('gender:male');
        expect(element.find('ul li:last').text()).toBe('type:cat');
    });

    it('should show different pet details', function(){
        console.log('element', element.find('ul li'));
        scope.pet = {
            id: 2,
            name: 'obama',
            gender: 'male',
            type: 'dog'
        };

        scope.$digest();

        var gender = angular.element(element.find('ul li')[1]);
        expect(element.find('ul li:first').text()).toBe('name:bingo');
        expect(gender.text()).toBe('gender:male');
        expect(element.find('ul li:last').text()).toBe('type:cat');
    });

    it('should call back function when user click back button', function(){
        spyOn(scope, 'back');

        console.log('clicking....');
        element.find('button').trigger('click');
        console.log('triggered');

        expect(scope.back).toHaveBeenCalled();
    });
});