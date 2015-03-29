<?php

namespace AppBundle\Controller;

use Sensio\Bundle\FrameworkExtraBundle\Configuration\Route;
use Symfony\Bundle\FrameworkBundle\Controller\Controller;

class DefaultController extends Controller {

	/**
     * @Route("/", name="homepage")
     */
    public function indexAction() {
    	$em = $this->get("doctrine")->getManager();
    	$user = $this->get("security.context")->getToken()->getUser();
    	$soundsData = $em->getRepository("AppBundle:Sound")
    		->findAvailableToUserAsArray($user);
    	$patternsData = $em->getRepository("AppBundle:Pattern")
    		->findAvailableToUser($user);
    	$pageActions = array(
    		array(
    			"Patterns list"
    		),
    		array(
    			"Backtracks list"
    		),
    		array(
    			"Settings"
    		),
    	);
        return $this->render('AppBundle::default/index.html.twig', array(
        	"sounds" => $soundsData,
        	"patterns" => $patternsData,
        	"pageActions" => $pageActions,
        ));
    }

}
