class HomeController < ApplicationController

  def index
    @countries = Country.select([:id, :abbreviation, :name, :north_america])
  end

  def countries
    step = params[:step] || 5
    offset = params[:offset] || 0
    @countries = Country.select([:id, :abbreviation, :name, :north_america]).limit(step.to_i).offset(offset.to_i)
    render :json => @countries
  end

end
