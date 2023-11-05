<?php

namespace App\Http\Controllers;

use App\Models\User;
use App\Models\Vote;
use Illuminate\Http\Request;

class BuyVotesController extends Controller
{
    /**
     * Allow purchasing of votes
     *
     * @param  \Illuminate\Http\Reques  $request
     * @return \Illuminate\Http\Response
     */
    public function index(Request $request)
    {
        // For now, with no payment integration, validate the data is correct
        // If so, credit the user with the number of votes they purchased

        try {
            // Validate the request
            $this->validateCC(
                $request->card_number,
                $request->cc_card_holder,
                $request->cc_expiration_date,
                $request->cvv);

            // Get the user
            $user = User::find($request->user_id);

            // Get the number of votes they purchased
            $votes = $request->num_votes;

            // Add the votes to the user's vote count
            $user->votes_available += $votes;
            $user->save();

            // Return the user's new vote count
            return response()->json([
                'votes_available' => $user->votes_available,
                'message' => 'Votes purchased successfully',
                'success' => true,
            ]);
        } catch (\Exception $e) {
            logger($e);

            return response()->json([
                'message' => 'Error purchasing votes',
                'success' => false,
            ]);
        }
    }

    private function validateCC($ccNumber, $cardHolder, $expirationDate, $cvv)
    {
        // Remove any spaces or non-numeric characters from the credit card number
        $ccNumber = preg_replace('/\D/', '', $ccNumber);

        // Check if the credit card number is 16 digits long and passes the Luhn algorithm
        if (strlen($ccNumber) !== 16 || ! $this->isValidLuhn($ccNumber)) {
            return false;
        }

        // Extract the expiration month and year from the date string
        [$expMonth, $expYear] = explode('/', $expirationDate);

        // Check if the expiration date is valid (not expired)
        $currentMonth = intval(date('m'));
        $currentYear = intval(date('Y'));

        if ($expYear < $currentYear || ($expYear == $currentYear && $expMonth < $currentMonth)) {
            return false;
        }

        // Check if the CVV is a 3 or 4-digit number (depending on the card type)
        if (! $this->isValidCVV($ccNumber, $cvv)) {
            return false;
        }

        // If all checks pass, the credit card information is valid
        return true;
    }

    // Helper function to validate the credit card number using the Luhn algorithm
    public function isValidLuhn($number)
    {
        $number = strrev($number);
        $sum = 0;
        for ($i = 0; $i < strlen($number); $i++) {
            $digit = intval($number[$i]);
            if ($i % 2 === 1) {
                $digit *= 2;
                if ($digit > 9) {
                    $digit -= 9;
                }
            }
            $sum += $digit;
        }

        return $sum % 10 === 0;
    }

    // Helper function to validate the CVV based on the card type
    public function isValidCVV($ccNumber, $cvv)
    {
        $firstDigit = $ccNumber[0];
        if ($firstDigit === '3' && (strlen($cvv) === 4)) {
            // American Express (start with '3' and has 4-digit CVV)
            return true;
        } elseif ($firstDigit !== '3' && (strlen($cvv) === 3)) {
            // Other card types (Visa, MasterCard, etc., have 3-digit CVV)
            return true;
        }

        return false;
    }
}
