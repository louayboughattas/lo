$(document).ready(function(){
	
	if($("#donation-select").length > 0){
		$("#donation-select").addClass("js-enabled");
		if($("#donation-type-select").val() == "monthly"){
			$("#donation-select-single").addClass("ds-type-hidden");
		}
		else{
			$("#donation-select-monthly").addClass("ds-type-hidden");
		}
		$("#donation-type-select").change(function(){
			var selectedTypeContainer = $("#donation-select-" + $(this).val());
			$(selectedTypeContainer).removeClass("ds-type-hidden");
			$(".ds-type").not(selectedTypeContainer).addClass("ds-type-hidden");
		});
	}
	
	if($("#map-donation-form").length > 0){
		
		$("#map-donation-form").addClass("js-enabled");
				
		function toggleGroupDetails(){
			if($('#donation_type_group').prop('checked') == true){
				$('#donation-details-group-container').slideDown('fast');
			}
			else{
				$('#donation-details-group-container').hide();
			}
		}
		
		function toggleMemoryDetails(){
			if($('#donation_type_memory').prop('checked') == true){
				$('#donation-details-memory-container').slideDown('fast');
			}
			else{
				$('#donation-details-memory-container').hide();
			}
		}
		
		function toggleZakatCheckbox(){
			if($('#donation_type_group').prop('checked') != true){
				$('#donation-details-zakat-container').slideDown('fast');
			}
			else{
				$('#donation-details-zakat-container').hide();
			}
		}
		
		function toggleGiftAid(triggerEvent){
			// if group selected, hide gift aid, check donation_gift_aid_no
			// else 
			//     if currency is usd (or country is not UK???), hide gift aid, check donation_gift_aid_no
			//     else show gift aid, 
			//         if it's on change
			//             uncheck donation_gift_aid_no
			
			var isGroupDonation = $('#donation_type_group').prop('checked') == true,
				selectedCurrency = $('#currency-select').val(),
				$giftAidContainer = $('#gift-aid-container'),
				$giftAidYes = $('#donation_gift_aid_yes'),
				$giftAidNo = $('#donation_gift_aid_no');

			if(!isGroupDonation){
				if (selectedCurrency == 'GBP') {
					$giftAidContainer.slideDown('fast');
					// $giftAidContainer.css('opacity', '1');
					if (triggerEvent == 'change') {
						$giftAidNo.prop('checked', false);
					}
				} else {
					$giftAidContainer.hide();
					// $giftAidContainer.css('opacity', '0.5');
					$giftAidYes.prop('checked', false);
					$giftAidNo.prop('checked', true);
				}
			}
			else{
				$giftAidContainer.hide();
				// $giftAidContainer.css('opacity', '0.5');
				$giftAidNo.prop('checked', false);
				$giftAidNo.prop('checked', true);
			}
		}
		
		function toggleOtherTitle(){
			if($('#donation_title').val() == 'Other'){
				$('#other-title-container').slideDown('fast');
			}
			else{
				$('#other-title-container').hide();
				//$('#donation_title_other').val('');
			}
		}
		
		function togglePostcodeFinder($countryField, $addressContainer){
			if($countryField.val() == 'United Kingdom'){
				if(addressIsEmpty($addressContainer)){
					$addressContainer.find('.address-postcode-search, .address-manual-toggle-container').show();
					hideAddress($addressContainer);
				}
			}
			else{
				showAddress($addressContainer);
				$addressContainer.find('.address-postcode-search, .address-manual-toggle-container').hide();
			}
		}

		function togglePostcodeRequired($countryField, $addressContainer){
			if ($countryField.val() == 'United Kingdom' || $countryField.val() == 'United States') {
				$addressContainer.find('.address-postcode-container').find('.form-field-required-star').show();
			} else {
				$addressContainer.find('.address-postcode-container').find('.form-field-required-star').hide();
			}
		}

		function toggleAmericanisms($countryField, $addressContainer){
			var $altUSTermItems = $addressContainer.find('[data-default-term][data-us-term]');
			if ($countryField.val() == 'United States') {
				$altUSTermItems.each(function() {
					$(this).html($(this).data('us-term'));
				});
			} else {
				$altUSTermItems.each(function() {
					$(this).html($(this).data('default-term'));
				});
			}
		}
		
		function hideAddress($addressContainer){
			$addressContainer.children().not('.address-postcode-container, .address-manual-toggle-container').hide();
		}
		function showAddress($addressContainer){
			$addressContainer.children().slideDown('fast');
			$addressContainer.find('.address-postcode-search, .address-manual-toggle-container, .address-options').hide();
			//$(addressContainer).find('.address-postcode-search, .address-manual-toggle-container').hide();
			if($addressContainer.find('#donation_state_container').length > 0){
				toggleUSState();
			}
		}
		
		function addressIsEmpty(addressContainer){
			var isEmpty = true;
			$(addressContainer).find('input').each(function(){
				if($(this).val() != ''){
					isEmpty = false;
				}
			});
			return(isEmpty);
		}
		
		function fillAddress(addressContainer, addressData, selectedOption){
			var address1, address2, address3, town, county, postcode;
			
			address1 = addressData[selectedOption].addressline1;
			address2 = addressData[selectedOption].addressline2;
			address3 = addressData[selectedOption].addressline3;
			town = addressData[selectedOption].posttown;
			county = addressData[selectedOption].county;
			postcode = addressData[selectedOption].postcode;
			
			$(addressContainer).find('.address-1').val(address1);
			$(addressContainer).find('.address-2').val(address2);
			$(addressContainer).find('.address-3').val(address3);
			
			$(addressContainer).find('.address-town').val(town);
			$(addressContainer).find('.address-county').val(county);
			$(addressContainer).find('.address-postcode').val(postcode);
		}
		
		function toggleUSState(){
			if($('#donation_country').val() == 'United States'){
				$('#donation_state_container').show(0);
				$('#donation_county_container').hide(0);
			}
			else{
				$('#donation_state_container').hide(0);
				$('#donation_state').val('');
				$('#donation_county_container').show(0);
			}
		}

		function checkDonationOption(amount){
			var $otherValContainer = $('.donation-amount-other-value-container');
			$('input[name="donation_amount"][value="' + amount + '"]').click();
			if(amount == 'Other'){
				$otherValContainer.removeClass('mobile-hidden');
			}
			else{
				$otherValContainer.addClass('mobile-hidden');
			}
		}

		function selectDonationOption(amount){
			var $otherValContainer = $('.donation-amount-other-value-container'),
				$donationAmountSelect = $('#donation-amount-select');
			$donationAmountSelect.val(amount);
			if(amount == 'Other'){
				$otherValContainer.removeClass('mobile-hidden');
			}
			else{
				$otherValContainer.addClass('mobile-hidden');
			}
		}

		function toggleCurrencySymbol(){
			var $currencySelect = $('#currency-select'),
				$currencySymbols = $('.donation-currency-symbol'),
				$donationForm = $('.donation-form'),
				$donationAmountOtherValue = $('.donation-amount-other-value-container');
			if ($currencySelect.val() == 'USD') {
				$currencySymbols.html('$');
				$donationAmountOtherValue.attr('data-currency-symbol', '$');
			} else if ($currencySelect.val() == 'GBP') {
				$currencySymbols.html('&pound;');
				$donationAmountOtherValue.attr('data-currency-symbol', '£');
			} else if ($currencySelect.val() == 'EUR') {
				$currencySymbols.html('&euro;');
				$donationAmountOtherValue.attr('data-currency-symbol', '€');
			} else {
				$currencySymbols.html($currencySelect.val());
				$donationAmountOtherValue.attr('data-currency-symbol', $currencySelect.val());				
			}
		}

		function toggleDefaultCountry(){
			var $currencySelect = $('#currency-select'),
				$groupCountryField = $('#donation_group_country'),
				$groupAddressContainer = $('#donation-details-group-address-container'),
				$billingCountryField = $('#donation_country'),
				$billingAddressContainer = $('#donation-address-container');

			switch ($currencySelect.val()) {
				case 'USD':
					if (addressIsEmpty($groupAddressContainer)) { // don't mess with address if it has already been filled in
						$groupCountryField.val('United States');
					}
					if (addressIsEmpty($billingAddressContainer)) {
						$billingCountryField.val('United States');
					}
					break;
				case 'GBP':
					if (addressIsEmpty($groupAddressContainer)) {
						$groupCountryField.val('United Kingdom');
					}
					if (addressIsEmpty($billingAddressContainer)) {
						$billingCountryField.val('United Kingdom');
					}
					break;
			}

			// then we need to toggle other country conditional fields
			togglePostcodeFinder($groupCountryField, $groupAddressContainer);
			togglePostcodeFinder($billingCountryField, $billingAddressContainer);
			togglePostcodeRequired($groupCountryField, $groupAddressContainer);
			togglePostcodeRequired($billingCountryField, $billingAddressContainer);
			toggleAmericanisms($groupCountryField, $groupAddressContainer);
			toggleAmericanisms($billingCountryField, $billingAddressContainer);
			toggleUSState();
			toggleGiftAid('change'); // this function should only be triggered on user interaction
		}
		
		//initialise
		toggleGroupDetails();
		toggleMemoryDetails();
		toggleZakatCheckbox();
		toggleGiftAid('load');
		toggleOtherTitle();
		toggleUSState();
		//checkDonationOption($('input[name="donation_amount"]:checked').val());
		selectDonationOption($('input[name="donation_amount"]:checked').val());
		
		$('.address-container').each(function(){
			$(this).find('.address-postcode').after('<a href="#" class="address-postcode-search">Find address</a>');
			$(this).append('<p class="address-manual-toggle-container"><a href="#" class="address-manual-toggle">Enter address manually</a></p>');

			if(addressIsEmpty($(this))){
				hideAddress($(this));
			}
			else{
				$(this).find('.address-postcode-search, .address-manual-toggle-container').hide();
			}
		
		});
			
		togglePostcodeFinder($('#donation_group_country'), $('#donation-details-group-address-container'));
		togglePostcodeFinder($('#donation_country'), $('#donation-address-container'));
		togglePostcodeRequired($('#donation_group_country'), $('#donation-details-group-address-container'));
		togglePostcodeRequired($('#donation_country'), $('#donation-address-container'));
		toggleAmericanisms($('#donation_group_country'), $('#donation-details-group-address-container'));
		toggleAmericanisms($('#donation_country'), $('#donation-address-container'));
		
		toggleCurrencySymbol();
		
		//event handlers
		$('input[name="donation_type"]').click(function(){
			toggleGroupDetails();
			toggleMemoryDetails();
			toggleZakatCheckbox();
			toggleGiftAid('change');
		});
		$('#donation_title').change(function(){
			toggleOtherTitle();
		});
		
		$('.address-manual-toggle').click(function(e){
			e.preventDefault();
			var addressContainer = $(this).parents('.address-container');
			showAddress(addressContainer);
			//$(this).hide();
		});
		$('.address-postcode-search').click(function(e){
			e.preventDefault();
			var addressContainer = $(this).parents('.address-container'),
				postcodeVal = $(this).siblings('.address-postcode').val();
			if(postcodeVal != ''){
				var postcoderUrl = 'https://ws.postcoder.com/pcw/PCWKQ-J2TV7-B3VX7-Y63ME/address/uk/' + postcodeVal + '?format=json&lines=3';
				//var postcoderUrl = 'http://ws.postcoder.com/pcw/PCW45-12345-12345-1234X/address/uk/NR147PZ?format=json&lines=3'; //
				$.get(postcoderUrl, function(data){
					if(data.length > 0){
						var addressOptions = '<option value="">Please select your address</option>';
						for(i = 0; i < data.length; i++){
							addressOptions += '<option value="' + i + '">' + data[i].summaryline + '</option>';
						}
						if($(addressContainer).find('.address-options').length == 0){
							$(addressContainer).find('.address-postcode-container').after('<p class="form-field-wrapper form-select"><select class="address-options input-no-label" size="7">' + addressOptions + '</select></p>');
							$(addressContainer).find('.address-options').change(function(){
								//console.log(data[$(this).val()]);
								fillAddress(addressContainer, data, $(this).val());
								showAddress(addressContainer);
							});
						}
						else{
							$(addressContainer).find('.address-options').html(addressOptions);
						}
						
						//scroll down a bit in case drop-down appears off screen
						$('html, body').animate({
							scrollTop: '+=100'
						}, 'slow');
					}
					else{
						alert('No addresses found for the postcode you specified');
					}
				}, 'json');
			}
			else{
				alert('Please enter a postcode');
			}
		});
		
		$('#donation_country').change(function(){
			togglePostcodeFinder($(this), $('#donation-address-container'));
			togglePostcodeRequired($(this), $('#donation-address-container'));
			toggleAmericanisms($(this), $('#donation-address-container'));
			toggleUSState();
		});
		$('#donation_group_country').change(function(){
			togglePostcodeFinder($(this), $('#donation-details-group-address-container'));
			togglePostcodeRequired($(this), $('#donation-details-group-address-container'));
			toggleAmericanisms($(this), $('#donation-details-group-address-container'));
		});
		
		$('#donation_submit').one('click', function(){
			$(this).val('Please wait...');
		});

		$('#donation-amount-select').on('change', function(){
			checkDonationOption($(this).val());
		});
		$('input[name="donation_amount"]').on('click', function(){
			selectDonationOption($(this).val());
		});

		$('#currency-select').change(function(){
			toggleCurrencySymbol();
			toggleDefaultCountry();
		});

	}
	
});